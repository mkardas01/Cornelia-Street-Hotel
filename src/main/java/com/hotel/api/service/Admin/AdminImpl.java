package com.hotel.api.service.Admin;

import com.hotel.api.dto.ChangeStatusDTO;
import com.hotel.api.dto.EditReservationDTO;
import com.hotel.api.dto.SearchReservation;
import com.hotel.api.exception.ReservationDateException;
import com.hotel.api.mapper.Mapper;
import com.hotel.api.model.reservation.Reservation;
import com.hotel.api.model.ReservationDTO;
import com.hotel.api.model.reservation.Status;
import com.hotel.api.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;


@Service
public class AdminImpl implements AdminService{

    @Autowired
    private ReservationRepository reservationRepository;

    private final Mapper mapper = new Mapper();

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

        return mapper.mapToReservationDTO(reservations);

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

        return mapper.mapToReservationDTO(reservations);
    }

    public List<ReservationDTO> cancelRequest(){

        List<Reservation> reservations = reservationRepository.findReservationByStatus(Status.CANCEL_REQUEST).orElseThrow();

        return mapper.mapToReservationDTO(reservations);

    }

    public ReservationDTO changeStatus(ChangeStatusDTO changeStatusDTO){

        Reservation reservation = reservationRepository.findReservationById(changeStatusDTO.getId());

        reservation.setStatus(Status.valueOf(changeStatusDTO.getAction()));

        reservationRepository.save(reservation);

        return mapper.mapToReservationDTO(reservation);
    }

    public ReservationDTO editReservation(EditReservationDTO editReservationDTO){

        Reservation reservation = reservationRepository.findReservationById(editReservationDTO.getId());

        reservation.setName(editReservationDTO.getName());
        reservation.setSurname(editReservationDTO.getSurname());
        reservation.setEmail(editReservationDTO.getEmail());
        reservation.setPhone(editReservationDTO.getPhone());


        reservationRepository.save(reservation);

        return mapper.mapToReservationDTO(reservation);

    }

}