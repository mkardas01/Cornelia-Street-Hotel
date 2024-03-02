package com.hotel.api.service.Reservation;


import com.hotel.api.dto.NewReservationDTO;
import com.hotel.api.model.reservation.Reservation;
import com.hotel.api.model.ReservationDTO;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;


public interface ReservationService {


    public NewReservationDTO reserveRoom(NewReservationDTO reservationDTO, Integer roomID, HttpServletRequest request);

    public List<Reservation> getAllReservation();

    public List<ReservationDTO> getUserReservation(HttpServletRequest request);
}
