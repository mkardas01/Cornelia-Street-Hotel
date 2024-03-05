package com.hotel.api.service.Reservation;

import com.hotel.api.dto.NewReservationDTO;
import com.hotel.api.exception.ReservationDateException;
import com.hotel.api.exception.ReservationException;
import com.hotel.api.exception.UserNotFoundException;
import com.hotel.api.mapper.ReservationDTOMapper;
import com.hotel.api.model.reservation.Reservation;
import com.hotel.api.model.ReservationDTO;
import com.hotel.api.model.Room;
import com.hotel.api.model.reservation.Status;
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

    private final ReservationDTOMapper reservationDTOMapper = new ReservationDTOMapper();


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
        Reservation reservation = Reservation.builder()
                .name(reservationDTO.getName())
                .surname(reservationDTO.getSurname())
                .email(reservationDTO.getEmail())
                .phone(reservationDTO.getPhone())
                .startDate(startDate)
                .endDate(endDate)
                .reservationNumber(UUID.randomUUID().toString().substring(0, 6).toUpperCase())
                .room(room)
                .status(Status.ACCEPTED)
                .build();

        String token = request.getHeader("Authorization");

        User user = null;

        if (token != null) {
            String username = jwtService.extractUserName(token.substring(7));
            user = userRepository.findByEmail(username).orElseThrow(() -> new UserNotFoundException("Twoje konto nie istnieje"));
        }

        reservation.setUser(user);

        return reservationRepository.save(reservation);
    }

    @Override
    public List<ReservationDTO> getUserReservation(HttpServletRequest request){
        
        String token = request.getHeader("Authorization");
        String username = jwtService.extractUserName(token.substring(7));

        User user = userRepository.findByEmail(username).orElseThrow(() -> new UserNotFoundException("Twoje konto nie istnieje"));

        List<Reservation> reservations = reservationRepository.getReservationByUserId(
                user.getId()).orElseThrow(() -> new ReservationException("Błąd w czasie pobierania rezerwacji"));

        return reservationDTOMapper.mapToReservationDTO(reservations);
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

        reservationRepository.save(reservation);


        return reservationDTOMapper.mapToReservationDTO(reservation);
    }
}
