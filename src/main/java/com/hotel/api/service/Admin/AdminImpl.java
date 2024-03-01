package com.hotel.api.service.Admin;

import com.hotel.api.mapper.ReservationDTOMapper;
import com.hotel.api.model.Reservation;
import com.hotel.api.model.ReservationDTO;
import com.hotel.api.repository.ReservationRepository;
import com.hotel.api.service.Reservation.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;


@Service
public class AdminImpl implements AdminService{

    @Autowired
    private ReservationRepository reservationRepository;

    private final ReservationDTOMapper reservationDTOMapper = new ReservationDTOMapper();

    public List<ReservationDTO> todaysReservations(){

        LocalDate startDate = LocalDate.now();
        List<Reservation> reservations = reservationRepository.getReservationByStartDate(startDate).orElseThrow();

        return reservationDTOMapper.mapToReservationDTO(reservations);

    }


}
