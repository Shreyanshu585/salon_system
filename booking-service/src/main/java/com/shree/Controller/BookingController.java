package com.shree.Controller;

import com.shree.Domain.BookingStatus;
import com.shree.Domain.PaymentMethod;
import com.shree.Mapper.BookingMapper;
import com.shree.Model.Booking;
import com.shree.Model.SalonReport;
import com.shree.Repository.BookingRepository;
import com.shree.Service.BookingService;
import com.shree.Service.client.PaymentFeignClient;
import com.shree.Service.client.SalonFeignClient;
import com.shree.Service.client.ServiceOfferingFeignClient;
import com.shree.Service.client.UserFeignClient;
import com.shree.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/booking")
public class BookingController {

    private final BookingService bookingService;
    private final SalonFeignClient salonFeignClient;
    private final UserFeignClient userFeignClient;
    private final ServiceOfferingFeignClient serviceOfferingFeignClient;
    private final PaymentFeignClient paymentFeignClient;
    private final BookingRepository bookingRepository;
    @PostMapping
    public ResponseEntity<PaymentLinkResponse> createBooking(
            @RequestParam Long salonId,
            @RequestParam PaymentMethod paymentMethod,
            @RequestBody BookingRequest request,
            @RequestHeader("Authorization") String jwt) throws Exception {

        UserDTO userDTO = userFeignClient.getUserProfile(jwt).getBody();

        SalonDTO salonDTO = salonFeignClient.getSalonById(salonId).getBody();

        System.out.println("Requested IDs = " + request.getServiceIds());
        Set<ServiceDTO> serviceDTOSet = serviceOfferingFeignClient.getServiceByIds(request.getServiceIds()).getBody();


        System.out.println("Received Services = " + serviceDTOSet);
        Booking booking = bookingService.createBooking(request, userDTO, salonDTO, serviceDTOSet);

        BookingDTO bookingDTO = BookingMapper.toDTO(booking);
        System.out.println("Booking Price = " + booking.getTotalPrice());
        System.out.println("DTO Price = " + bookingDTO.getTotalPrice());


        try {
            PaymentLinkResponse response =
                    paymentFeignClient.createPaymentLink(
                            bookingDTO,
                            paymentMethod,
                            jwt
                    ).getBody();


            return ResponseEntity.ok(response);

        } catch (Exception e) {
            System.out.println(
                    "Payment creation failed. Deleting booking: "
                            + booking.getId()
            );
            bookingRepository.deleteById(booking.getId());

            throw e;
        }
        //PaymentLinkResponse response = paymentFeignClient.createPaymentLink(bookingDTO, paymentMethod, jwt).getBody();

        //return ResponseEntity.ok(response);
    }

    @GetMapping("/customer")
    public ResponseEntity<Set<BookingDTO>> getBookingByCustomer(@RequestHeader("Authorization") String jwt) throws Exception {
        UserDTO userDTO = userFeignClient.getUserProfile(jwt).getBody();
        if (userDTO == null || userDTO.getId() == null) {
            throw new Exception("user not found fro jwt..");
        }

        List<Booking> booking = bookingService.getBookingsByCustomer(userDTO.getId());

        return ResponseEntity.ok(getBookingDTOs(booking));
    }

    private Set<BookingDTO> getBookingDTOs(List<Booking> bookings) {
        return bookings.stream()
                .map(booking -> {
                    return BookingMapper.toDTO(booking);
                }).collect(Collectors.toSet());
    }


    @GetMapping("/salons")
    public ResponseEntity<Set<BookingDTO>> getBookingBySalon(@RequestHeader("Authorization") String jwt) throws Exception {
        SalonDTO salon = salonFeignClient.getSalonOwnerById(jwt).getBody();
        List<Booking> booking = bookingService.getBookingsBySalon(salon.getId());

        return ResponseEntity.ok(getBookingDTOs(booking));
    }

    @GetMapping("/{bookingId}")
    public ResponseEntity<BookingDTO> getBookingById(@PathVariable Long bookingId) throws Exception {

        Booking booking = bookingService.getBookingById(bookingId);

        return ResponseEntity.ok(BookingMapper.toDTO(booking));
    }


    @PutMapping("/{bookingId}/status")
    public ResponseEntity<BookingDTO> updateBookingStatus(
            @PathVariable Long bookingId,
            @RequestParam BookingStatus status) throws Exception {

        Booking booking = bookingService.updateBooking(bookingId, status);
        return ResponseEntity.ok(BookingMapper.toDTO(booking));
    }


    @GetMapping("/slots/salon/{salonId}/date/{date}")
    public ResponseEntity<List<BookingSlotDTO>> getBookedSlot(@PathVariable Long salonId, @RequestParam(required = false) LocalDate date) throws Exception {

        List<Booking> bookings = bookingService.getBookingByDate(date, salonId);
        List<BookingSlotDTO> slotDTOS = bookings.stream()
                .map(booking -> {
                    BookingSlotDTO slotDTO = new BookingSlotDTO();
                    slotDTO.setStartTime(booking.getStartTime());
                    slotDTO.setEndTime(booking.getEndTime());
                    return slotDTO;
                }).collect(Collectors.toList());
        return ResponseEntity.ok(slotDTOS);
    }


    @GetMapping("/report")
    public ResponseEntity<SalonReport> getSalonReport(@RequestHeader("Authorization") String jwt) throws Exception {

        SalonDTO salon = salonFeignClient.getSalonOwnerById(jwt).getBody();
        SalonReport salonReport = bookingService.getSalonReport(salon.getId());

        return ResponseEntity.ok(salonReport);
    }
}
