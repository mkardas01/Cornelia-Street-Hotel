package com.hotel.api.controller;

import com.hotel.api.model.Reservation;
import com.hotel.api.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/reservation")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @GetMapping("/getAll")
    public List<Reservation> getAllReservation(){

        return reservationService.getAllReservation();

    }
}
