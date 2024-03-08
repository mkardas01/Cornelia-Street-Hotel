package com.hotel.api.service.Reservation;

import com.hotel.api.dto.NewReservationDTO;
import com.hotel.api.exception.*;
import com.hotel.api.mapper.Mapper;
import com.hotel.api.model.reservation.Reservation;
import com.hotel.api.model.ReservationDTO;
import com.hotel.api.model.Room;
import com.hotel.api.model.reservation.Status;
import com.hotel.api.model.user.Role;
import com.hotel.api.model.user.User;
import com.hotel.api.repository.ReservationRepository;
import com.hotel.api.repository.RoomRepository;
import com.hotel.api.repository.UserRepository;
import com.hotel.api.service.Jwt.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
public class ReservationImpl implements ReservationService{

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    private final Mapper mapper = new Mapper();


    @Override
    public NewReservationDTO reserveRoom(NewReservationDTO reservationDTO, Integer roomID, HttpServletRequest request) {

        validateReservation(reservationDTO, roomID);

        LocalDate startDate = parseDate(reservationDTO.getStartDate());
        LocalDate endDate = parseDate(reservationDTO.getEndDate());

        Room room = findRoomById(roomID);
        checkRoomAvailability(roomID, startDate, endDate);
        Reservation reservation = createReservation(reservationDTO, startDate, endDate, room, request);

        reservationDTO.setReservationNumber(reservation.getReservationNumber().toUpperCase());

        return reservationDTO;
    }

    private void validateReservation(NewReservationDTO reservationDTO, Integer roomID) {
        if (!Objects.equals(reservationDTO.getRoomID(), roomID)) {
            throw new ReservationException("Wystąpił błąd w czasie rezerwacji");
        }
        if (reservationDTO.getPhone().charAt(0) == '0') {
            throw new ReservationException("Wprowadzono nieprawidłowy numer telefonu");
        }
    }

    private LocalDate parseDate(String dateStr) {
        try {
            return LocalDate.parse(dateStr);
        } catch (DateTimeParseException e) {
            throw new ReservationDateException("Podano nieprawidłowy format daty");
        }
    }

    private Room findRoomById(Integer roomID) {
        return roomRepository.getRoomById(roomID)
                .orElseThrow(() -> new ReservationException("Podany pokój nie istnieje"));
    }

    private void checkRoomAvailability(Integer roomID, LocalDate startDate, LocalDate endDate) {
        if (reservationRepository.existsReservationForRoomInPeriod(roomID, startDate, endDate)) {
            throw new ReservationException("Ten pokój niestety został już zarezerwowany");
        }
    }

    private Reservation createReservation(NewReservationDTO reservationDTO, LocalDate startDate, LocalDate endDate,
                                          Room room, HttpServletRequest request) {

        String token = request.getHeader("Authorization");
        String username = reservationDTO.getEmail();
        String role = "USER";
        User user = userRepository.findByEmail(username).orElse(null);

        if (token == null && user != null)
            throw new UserError("Aby dokonać rezerwacji na ten email, należy się zalogować");

        if (token != null) {

            token = token.substring(7);
            username = jwtService.extractUserName(token);
            role = jwtService.extractRole(token);

            if (user == null || (!Objects.equals(username, user.getEmail()) && !Objects.equals(role, "ADMIN")))
                throw new UserError("Aby dokonać rezerwacji na ten email, należy się zalogować");

            else if (Objects.equals(role, "ADMIN")) {
                username = reservationDTO.getEmail();
            }

            user = userRepository.findByEmail(username).orElse(null);
        }


        Reservation reservation = Reservation.builder()
                .name(reservationDTO.getName())
                .surname(reservationDTO.getSurname())
                .email(username)
                .phone(reservationDTO.getPhone())
                .startDate(startDate)
                .endDate(endDate)
                .reservationNumber(UUID.randomUUID().toString().substring(0, 6).toUpperCase())
                .room(room)
                .status(Status.ACCEPTED)
                .user(user)
                .build();


        try {
            return reservationRepository.save(reservation);

        } catch (Exception e) {

            throw new DataBaseException("Wystąpił błąd w czasie zapisu do bazy danych");
        }

    }

    @Override
    public List<ReservationDTO> getUserReservation(HttpServletRequest request){
        
        String token = request.getHeader("Authorization");
        String username = jwtService.extractUserName(token.substring(7));

        User user = userRepository.findByEmail(username).orElseThrow(() -> new UserNotFoundException("Twoje konto nie istnieje"));

        List<Reservation> reservations = reservationRepository.getReservationByUserId(
                user.getId()).orElseThrow(() -> new ReservationException("Wystąpił błąd w czasie pobierania rezerwacji"));

        return mapper.mapToReservationDTO(reservations);
    }


    @Override
    public ReservationDTO cancelRequest(Integer id, HttpServletRequest request) {

        String token = request.getHeader("Authorization");
        String username = jwtService.extractUserName(token.substring(7));

        User user = userRepository.findByEmail(username).orElseThrow(() -> new UserNotFoundException("Twoje konto nie istnieje"));

        Reservation reservation = reservationRepository.findReservationById(id);

        if(!Objects.equals(reservation.getUser().getId(), user.getId())){
            throw new ReservationException("Nie jesteś właścicielem tej rezerwacji");
        }

        reservation.setStatus(Status.CANCEL_REQUEST);

        try {
            reservationRepository.save(reservation);

        } catch (Exception e) {

            throw new DataBaseException("Wystąpił błąd w czasie zapisu do bazy danych");
        }

        return mapper.mapToReservationDTO(reservation);
    }
}
