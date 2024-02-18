package com.hotel.api.controller;

import com.hotel.api.dto.NewReservationDTO;
import com.hotel.api.exception.BookRoomDateException;
import com.hotel.api.exception.ReservationDateException;
import com.hotel.api.exception.ReservationException;
import com.hotel.api.model.Reservation;
import com.hotel.api.model.Room;
import com.hotel.api.service.ReservationService;
import com.hotel.api.service.RoomService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/reservation")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private RoomService roomService;

    @PostMapping("/reserve/{roomID}")
    @ResponseBody
    @CrossOrigin
    public ResponseEntity<?> reserveRoom(@PathVariable Integer roomID, @RequestBody @Valid NewReservationDTO reservationDTO) {

        if (!Objects.equals(reservationDTO.getRoomID(), roomID)) {
            throw new ReservationException("Wystąpił błąd w czasie rezerwacji");
        }

        LocalDate startDate;
        LocalDate endDate;

        try {
            startDate = LocalDate.parse(reservationDTO.getStartDate());
            endDate = LocalDate.parse(reservationDTO.getEndDate());
        } catch (Exception e) {
            throw new ReservationDateException("Podano nieprawidłowy format daty");
        }

        if(startDate.isAfter(endDate))
            throw new ReservationDateException("Data przyjadu musi być wcześniejsza niż data wyjazdu");

        else if(endDate.isBefore(LocalDate.now()))
            throw new ReservationDateException("Nie można wyszukać zarezerować pokoju w przeszłości");


        Room room = roomService.getRoomByID(roomID).orElseThrow(() -> new ReservationException("Podany pokój nie istnieje"));

        if (reservationService.isRoomNotReserved(startDate, endDate, roomID)) {

            Reservation reservation = Reservation.builder()
                    .name(reservationDTO.getName())
                    .surname(reservationDTO.getSurname())
                    .email(reservationDTO.getEmail())
                    .startDate(startDate)
                    .endDate(endDate)
                    .reservationNumber(UUID.randomUUID().toString().substring(0, 6))
                    .room(room)
                    .build();

            reservation = reservationService.reserveRoom(reservation);

            reservationDTO.setReservationNumber(reservation.getReservationNumber().toUpperCase());

            return new ResponseEntity<>(reservationDTO, HttpStatus.OK);

        } else {
            throw new ReservationException("Ten pokój niestety został już zarezerwowany");
        }


    }

    @GetMapping("/getAll")
    public List<Reservation> getAllReservation(){

        return reservationService.getAllReservation();

    }
}
