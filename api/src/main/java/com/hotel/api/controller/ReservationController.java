package com.hotel.api.controller;

import com.hotel.api.dto.NewReservationDTO;
import com.hotel.api.model.reservation.Reservation;
import com.hotel.api.model.ReservationDTO;
import com.hotel.api.service.Reservation.ReservationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/reservation")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;


    @PostMapping("/reserve/{roomID}")
    @ResponseBody
    @CrossOrigin
    public ResponseEntity<?> reserveRoom(@PathVariable Integer roomID, @RequestBody @Valid NewReservationDTO reservationDTO
                                                        , HttpServletRequest request) {

        return new ResponseEntity<>(reservationService.reserveRoom(reservationDTO, roomID, request), HttpStatus.OK);

    }

    @PostMapping("/getReservations")
    @CrossOrigin
    @ResponseBody
    public ResponseEntity<?> getUserReservation(HttpServletRequest request){

        return new ResponseEntity<List<ReservationDTO>>(reservationService.getUserReservation(request), HttpStatus.OK);
    }

    @PostMapping("/cancelRequest")
    @CrossOrigin
    @ResponseBody
    public ResponseEntity<?> CancelRequest(@RequestBody Map<String, Object> requestBody, HttpServletRequest request){

        Integer id = (Integer) requestBody.get("id");

        return new ResponseEntity<>(reservationService.cancelRequest(id, request), HttpStatus.OK);
    }

}
