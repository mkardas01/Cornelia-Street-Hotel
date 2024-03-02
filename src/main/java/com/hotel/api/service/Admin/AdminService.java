package com.hotel.api.service.Admin;

import com.hotel.api.dto.SearchReservation;
import com.hotel.api.model.ReservationDTO;

import java.util.List;

public interface AdminService {

    public List<ReservationDTO> todaysReservations();

    public List<ReservationDTO> searchReservation(SearchReservation searchReservation);

    public List<ReservationDTO> cancelRequest();

    }
