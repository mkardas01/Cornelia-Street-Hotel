package com.hotel.api.controller;

import com.hotel.api.dto.SearchReservation;
import com.hotel.api.exception.ReservationDateException;
import com.hotel.api.service.Admin.AdminService;
import com.hotel.api.service.Reservation.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;

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

    @PostMapping("searchReservation")
    @CrossOrigin
    public ResponseEntity<?> SearchReservations(@RequestBody SearchReservation searchReservation){



        return new ResponseEntity<>(adminService.searchReservation(searchReservation), HttpStatus.OK);
    }

    @PostMapping("cancelRequests")
    @CrossOrigin
    public ResponseEntity<?> CancelRequests(){



        return new ResponseEntity<>(adminService.cancelRequest(), HttpStatus.OK);
    }


}
