package com.hotel.api.service;


import com.hotel.api.dto.NewReservationDTO;
import com.hotel.api.model.Reservation;

import java.time.LocalDate;
import java.util.List;


public interface ReservationService {

    Boolean isRoomNotReserved(LocalDate startDate, LocalDate endDate, Integer roomID);

    public Reservation reserveRoom(Reservation reservation);

    public List<Reservation> getAllReservation();
}
