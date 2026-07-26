package com.shree.Service.Impl;

import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
//import com.shree.Domain.BookingStatus;
import com.shree.Domain.PaymentMethod;
import com.shree.Domain.PaymentOrderStatus;
import com.shree.Model.PaymentOrder;
import com.shree.PayloadResponse.dto.BookingDTO;
import com.shree.PayloadResponse.dto.UserDTO;
import com.shree.PayloadResponse.response.PaymentLinkResponse;
import com.shree.Repository.PaymentOrderRepository;
import com.shree.Service.PaymentService;
//import com.shree.Service.client.ABookingFeignClient;
//import com.shree.Service.client.BookingFeignClient;
import com.shree.messaging.BookingEventProducer;
import com.shree.messaging.NotificationEventProducer;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    public final PaymentOrderRepository paymentOrderRepository;
   // private final BookingFeignClient bookingFeignClient;
private  final BookingEventProducer bookingEventProducer;
   private final NotificationEventProducer notificationEventProducer;

    @Value("${stripe.api.key}")
    private String stripeSecreteKey;
    @Value("${razorpay.api.key}")
    private String razorpayApiKey;
    @Value("${razorpay.api.secret}")
    private String getRazorpayApiSecretKey;

    @Override
    public PaymentLinkResponse createOrder(UserDTO userDTO, BookingDTO booking, PaymentMethod paymentMethod) throws RazorpayException, StripeException {
        Long amount = (long) booking.getTotalPrice();
        // Long amount = (long) booking.getTotalPrice();
        if (amount == null || amount <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Booking amount must be greater than zero");
        }

        PaymentOrder order = new PaymentOrder();

        order.setAmount(amount);
        order.setPaymentMethod(paymentMethod);
        order.setStatus(PaymentOrderStatus.PENDING);
        order.setBookingId(booking.getId());
        order.setSalonId(booking.getSalonId());
        System.out.println("userDTO = " + userDTO);
        System.out.println("userId = " + userDTO.getId());
        order.setUserId(userDTO.getId());


        PaymentOrder savedOrder = paymentOrderRepository.save(order);

        PaymentLinkResponse paymentLinkResponse = new PaymentLinkResponse();
        if (paymentMethod.equals(PaymentMethod.RAZORPAY)) {

            PaymentLink payment = createRazorpayPaymentLink(userDTO, savedOrder.getAmount(), savedOrder.getId());

            String paymentUrl = payment.get("short_url");
            String paymentUrlId = payment.get("id");
            paymentLinkResponse.setPayment_link_url(paymentUrl);
            paymentLinkResponse.setGetPayment_link_id(paymentUrlId);
            savedOrder.setPaymentLinkId(paymentUrlId);
            paymentOrderRepository.save(savedOrder);

        } else {
            String paymentUrl = createStripePaymentLink(userDTO, savedOrder.getAmount(), savedOrder.getId());
            paymentLinkResponse.setPayment_link_url(paymentUrl);

        }
        return paymentLinkResponse;
    }

    @Override
    public PaymentOrder getPaymentOrderById(Long id) throws Exception {
        PaymentOrder paymentOrder = paymentOrderRepository.findById(id).orElse(null);
        if (paymentOrder == null) {
            throw new Exception("payment order not found");

        }
        return paymentOrder;
    }

    @Override
    public PaymentOrder getPaymentOrderByPaymentId(String paymentLinkId) {
        return paymentOrderRepository.findByPaymentLinkId(paymentLinkId.trim())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Payment order not found for linkId: " + paymentLinkId
                ));
    }


    @Override
    public PaymentLink createRazorpayPaymentLink(UserDTO user, Long Amount, Long orderId) throws RazorpayException {

        Long amount = Amount * 100;

        RazorpayClient razorpayClient = new RazorpayClient(razorpayApiKey, getRazorpayApiSecretKey);

        JSONObject paymentLinkRequest = new JSONObject();
        paymentLinkRequest.put("amount", amount);
        paymentLinkRequest.put("currency", "INR");

        JSONObject customer = new JSONObject();
        customer.put("name", user.getFullName());
        customer.put("email", user.getEmail());
        paymentLinkRequest.put("customer", customer);

        JSONObject notify = new JSONObject();
        notify.put("email", true);
        paymentLinkRequest.put("notify", notify);
        paymentLinkRequest.put("reminder_enable", true);

        paymentLinkRequest.put("callback_url", "http://localhost:3000/payment-success/" + orderId);

        paymentLinkRequest.put("callback_method", "get");

        return razorpayClient.paymentLink.create(paymentLinkRequest);
    }

    @Override
    public String createStripePaymentLink(UserDTO user, Long amount, Long orderId) throws StripeException {

        Stripe.apiKey = stripeSecreteKey;

        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:3000/payment-success/" + orderId)
                .setCancelUrl("http://localhost:3000/payment/cancel")
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("usd")
                                .setUnitAmount(amount * 100)
                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                        .setName("salon appointment booking ").build()


                                ).build()
                        ).build()
                ).build();

        Session session = Session.create(params);
        return session.getUrl();
    }

        @Override
    public Boolean proceedPayment(PaymentOrder paymentOrder, String paymentId, String paymentLinkId) throws RazorpayException {

       if(paymentOrder.getStatus().equals(PaymentOrderStatus.PENDING)){
           if(paymentOrder.getPaymentMethod().equals(PaymentMethod.RAZORPAY)){
               RazorpayClient razorpayClient = new RazorpayClient(razorpayApiKey,getRazorpayApiSecretKey);

               Payment payment= razorpayClient.payments.fetch(paymentId);
               Integer amount = payment.get("amount");
               String status = payment.get("status");

               if (status.equals("captured")){

                   bookingEventProducer.sentBookingUpdateEvent(paymentOrder);

                   notificationEventProducer.sentNotification(paymentOrder.getBookingId(), paymentOrder.getUserId(), paymentOrder.getSalonId());
                   paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
                   paymentOrder.setRazorpayPaymentId(paymentId);
                   paymentOrderRepository.save(paymentOrder);
                   return true;
               }
               return false;

           }else {
               paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
               paymentOrderRepository.save(paymentOrder);
               return true;
           }
       }

        return false;
    }
//
//
//    @Override
//    public Boolean proceedPayment(PaymentOrder paymentOrder, String paymentId, String paymentLinkId) {
//        if (paymentOrder.getStatus().equals(PaymentOrderStatus.SUCCESS)) {
//            return true; // already confirmed by webhook
//        }
//        return false; // still pending or failed
//    }
//
//    @Override
//    public Boolean proceedPayment(
//            PaymentOrder paymentOrder,
//            String paymentId,
//            String paymentLinkId) {
//
//        if (!paymentOrder.getStatus().equals(PaymentOrderStatus.SUCCESS)) {
//
//            paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
//            paymentOrder.setRazorpayPaymentId(paymentId);
//
//            paymentOrderRepository.save(paymentOrder);
//
////            bookingFeignClient.updateBookingStatus(
////                    paymentOrder.getBookingId(),
////                    BookingStatus.CONFIRMED
////            );
//        }
//
//        return true;
//    }

}