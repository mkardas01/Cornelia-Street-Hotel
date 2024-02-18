package com.hotel.api.service;

import com.hotel.api.model.Reservation;
import com.hotel.api.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReservationImpl implements ReservationService{

    @Autowired
    private ReservationRepository reservationRepository;

    @Override
    public Boolean isRoomNotReserved(LocalDate startDate, LocalDate endDate, Integer roomID) {

        List<Reservation> reservations = reservationRepository.isRoomNotReserved(startDate, endDate, roomID);

        return reservations.isEmpty();

    }

    @Override
    public Reservation reserveRoom(Reservation reservation) {

        return  reservationRepository.save(reservation);

    }


    @Override
    public List<Reservation> getAllReservation() {

        return reservationRepository.findAll();
    }
}
