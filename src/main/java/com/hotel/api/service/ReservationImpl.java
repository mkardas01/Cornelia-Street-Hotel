package com.hotel.api.service;

import com.hotel.api.model.Reservation;
import com.hotel.api.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationImpl implements ReservationService{

    @Autowired
    private ReservationRepository reservationRepository;


    @Override
    public List<Reservation> getAllReservation() {

        return reservationRepository.findAll();
    }
}
