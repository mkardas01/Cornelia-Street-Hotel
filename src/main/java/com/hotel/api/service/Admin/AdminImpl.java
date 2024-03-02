package com.hotel.api.service.Admin;

import com.hotel.api.dto.SearchReservation;
import com.hotel.api.exception.ReservationDateException;
import com.hotel.api.mapper.ReservationDTOMapper;
import com.hotel.api.model.Reservation;
import com.hotel.api.model.ReservationDTO;
import com.hotel.api.repository.ReservationRepository;
import com.hotel.api.service.Reservation.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;


@Service
public class AdminImpl implements AdminService{

    @Autowired
    private ReservationRepository reservationRepository;

    private final ReservationDTOMapper reservationDTOMapper = new ReservationDTOMapper();

    private LocalDate parseDate(String dateStr) {
        try {
            System.out.println(dateStr);
            return dateStr == null ? null : LocalDate.parse(dateStr);
        } catch (DateTimeParseException e) {
            throw new ReservationDateException("Podano nieprawidłowy format daty");
        }
    }

    public List<ReservationDTO> todaysReservations(){

        LocalDate startDate = LocalDate.now();
        List<Reservation> reservations = reservationRepository.getReservationByStartDate(startDate).orElseThrow();

        return reservationDTOMapper.mapToReservationDTO(reservations);

    }

    public List<ReservationDTO> searchReservation(SearchReservation searchReservation){

        LocalDate startDate = parseDate(searchReservation.getStartDate());
        LocalDate endDate = parseDate(searchReservation.getEndDate());

        List<Reservation> reservations = reservationRepository
                                        .getReservation(
                                                searchReservation.getReservationNumber(),
                                                searchReservation.getEmail(),
                                                searchReservation.getSurname(),
                                                startDate,
                                                endDate)
                                        .orElseThrow();

        return reservationDTOMapper.mapToReservationDTO(reservations);
    }


}
