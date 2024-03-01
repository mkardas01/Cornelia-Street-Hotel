package com.hotel.api.controller;

import com.hotel.api.service.Admin.AdminService;
import com.hotel.api.service.Reservation.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("todaysReservations")
    @CrossOrigin
    public ResponseEntity<?> TodaysReservations(){

        return new ResponseEntity<>(adminService.todaysReservations(), HttpStatus.OK);
    }

}
