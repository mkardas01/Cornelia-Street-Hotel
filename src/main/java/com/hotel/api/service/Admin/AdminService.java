package com.hotel.api.service.Admin;

import com.hotel.api.model.Reservation;
import com.hotel.api.model.ReservationDTO;

import java.time.LocalDate;
import java.util.List;

public interface AdminService {

    public List<ReservationDTO> todaysReservations();


}
