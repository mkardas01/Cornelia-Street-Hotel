package com.hotel.api.service;

import com.hotel.api.dto.NewReservationDTO;
import com.hotel.api.dto.RoomDTO;
import com.hotel.api.exception.ReservationDateException;
import com.hotel.api.exception.ReservationException;
import com.hotel.api.model.Reservation;
import com.hotel.api.model.ReservationDTO;
import com.hotel.api.model.Room;
import com.hotel.api.repository.ReservationRepository;
import com.hotel.api.repository.RoomRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ReservationImpl implements ReservationService{

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private JwtService jwtService;

    private List<ReservationDTO> mapToReservationDTO(List<Reservation> reservations) {
        return reservations.stream()
                .map(reservation -> ReservationDTO.builder()
                        .id(reservation.getId())
                        .name(reservation.getName())
                        .surname(reservation.getSurname())
                        .email(reservation.getEmail())
                        .phone(reservation.getPhone())
                        .startDate(reservation.getStartDate())
                        .endDate(reservation.getEndDate())
                        .reservationNumber(reservation.getReservationNumber())
                        .room(mapToRoomDTO(reservation.getRoom()))
                        .build())
                .collect(Collectors.toList());
    }

    private RoomDTO mapToRoomDTO(Room room) {
        return RoomDTO.builder()
                .id(room.getId())
                .floorNumber(room.getFloorNumber())
                .number(room.getNumber())
                .size(room.getSize())
                .price(room.getPrice())
                .name(room.getName())
                .description(room.getDescription())
                .picPath(room.getPicPath())
                .build();
    }

    @Override
    public NewReservationDTO reserveRoom(NewReservationDTO reservationDTO, Integer roomID) {

        if (!Objects.equals(reservationDTO.getRoomID(), roomID)) {
            throw new ReservationException("Wystąpił błąd w czasie rezerwacji");
        }

        if(reservationDTO.getPhone().charAt(0) == '0'){
            throw new ReservationException("Wprowadzono nieprawidłowy numer telefonu");
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


        Room room = roomRepository.getRoomById(roomID).orElseThrow(() -> new ReservationException("Podany pokój nie istnieje"));

        if (!reservationRepository.
                existsByStartDateAfterOrStartDateEqualsOrEndDateBeforeAndRoomId(
                        startDate, startDate, endDate, roomID)
        ) {

            Reservation reservation = Reservation.builder()
                    .name(reservationDTO.getName())
                    .surname(reservationDTO.getSurname())
                    .email(reservationDTO.getEmail())
                    .phone(reservationDTO.getPhone())
                    .startDate(startDate)
                    .endDate(endDate)
                    .reservationNumber(UUID.randomUUID().toString().substring(0, 6))
                    .room(room)
                    .build();

            reservation = reservationRepository.save(reservation);

            reservationDTO.setReservationNumber(reservation.getReservationNumber().toUpperCase());

            return reservationDTO;

        } else {
            throw new ReservationException("Ten pokój niestety został już zarezerwowany");
        }

    }


    @Override
    public List<Reservation> getAllReservation() {

        return reservationRepository.findAll();
    }

    @Override
    public List<ReservationDTO> getUserReservation(HttpServletRequest request){
        
        String token = request.getHeader("Authorization");
        String username = jwtService.extractUserName(token.substring(7));

        List<Reservation> reservations = reservationRepository.getReservationByEmail(username).orElseThrow();

        return mapToReservationDTO(reservations);
    }

}
