package com.shree.Controller;

import com.razorpay.RazorpayException;
import com.shree.Domain.PaymentMethod;
import com.shree.Model.PaymentOrder;
import com.shree.PayloadResponse.dto.BookingDTO;
import com.shree.PayloadResponse.dto.UserDTO;
import com.shree.PayloadResponse.response.PaymentLinkResponse;
import com.shree.Service.PaymentService;
import com.shree.Service.client.UserFeignClient;
import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService ;
    private final UserFeignClient userFeignClient;
@PostMapping("/create")
public ResponseEntity<PaymentLinkResponse> createPaymentLink(
        @RequestBody BookingDTO booking ,
        @RequestHeader("Authorization")String jwt,
        @RequestParam PaymentMethod paymentMethod) throws Exception {

    UserDTO user =userFeignClient.getUserProfile(jwt).getBody();

    PaymentLinkResponse response = paymentService.createOrder(user,booking ,paymentMethod);
    return ResponseEntity.ok(response);
}




    @GetMapping("/{paymentOrderId}")
    public ResponseEntity<PaymentOrder> createPaymentOrderById(
           @PathVariable Long paymentOrderId) throws Exception {

PaymentOrder paymentOrder = paymentService.getPaymentOrderById(paymentOrderId);
        return ResponseEntity.ok(paymentOrder);
    }

@PatchMapping("/proceed")
    public ResponseEntity<Boolean> proceedPayment(
          @RequestParam String paymentId,String paymentLinkId ) throws RazorpayException {

    System.out.println("Proceed Payment Called");
    System.out.println("paymentId = " + paymentId);
    System.out.println("paymentLinkId = " + paymentLinkId);
    paymentLinkId = paymentLinkId.trim();
        PaymentOrder paymentOrder = paymentService.getPaymentOrderByPaymentId(paymentLinkId);
        Boolean response = paymentService.proceedPayment(paymentOrder,paymentId,paymentLinkId);
        return ResponseEntity.ok(response);
    }






}
