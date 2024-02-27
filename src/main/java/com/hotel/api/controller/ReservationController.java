package com.hotel.api.controller;

import com.hotel.api.dto.NewReservationDTO;
import com.hotel.api.exception.BookRoomDateException;
import com.hotel.api.exception.ReservationDateException;
import com.hotel.api.exception.ReservationException;
import com.hotel.api.model.Reservation;
import com.hotel.api.model.ReservationDTO;
import com.hotel.api.model.Room;
import com.hotel.api.service.JwtService;
import com.hotel.api.service.ReservationService;
import com.hotel.api.service.RoomService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.hibernate.validator.constraints.Length;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/reservation")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;


    @PostMapping("/reserve/{roomID}")
    @ResponseBody
    @CrossOrigin
    public ResponseEntity<?> reserveRoom(@PathVariable Integer roomID, @RequestBody @Valid NewReservationDTO reservationDTO) {

        return new ResponseEntity<>(reservationService.reserveRoom(reservationDTO, roomID), HttpStatus.OK);

    }

    @PostMapping("/getReservations")
    @CrossOrigin
    public ResponseEntity<?> getUserReservation(HttpServletRequest request){

        return new ResponseEntity<List<ReservationDTO>>(reservationService.getUserReservation(request), HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public List<Reservation> getAllReservation(){

        return reservationService.getAllReservation();

    }
}
