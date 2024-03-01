package com.hotel.api.service.Admin;

import com.hotel.api.model.ReservationDTO;
import com.hotel.api.service.Reservation.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class AdminImpl implements AdminService{

    @Autowired
    private ReservationService reservationService;

    public List<ReservationDTO> todaysReservations(){
        return null;
    }

}
