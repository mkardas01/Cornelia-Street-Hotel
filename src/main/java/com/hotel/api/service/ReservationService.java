package com.hotel.api.service;


import com.hotel.api.dto.NewReservationDTO;
import com.hotel.api.model.Reservation;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.List;


public interface ReservationService {


    public NewReservationDTO reserveRoom(NewReservationDTO reservationDTO, Integer roomID);

    public List<Reservation> getAllReservation();

    public List<Reservation> getUserReservation(HttpServletRequest request);
}
