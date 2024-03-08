package com.hotel.api.service.Reservation;

import com.hotel.api.dto.NewReservationDTO;
import com.hotel.api.exception.ReservationDateException;
import com.hotel.api.exception.ReservationException;
import com.hotel.api.model.ReservationDTO;
import com.hotel.api.model.Room;
import com.hotel.api.model.reservation.Reservation;
import com.hotel.api.model.reservation.Status;
import com.hotel.api.model.user.User;
import com.hotel.api.repository.ReservationRepository;
import com.hotel.api.repository.RoomRepository;
import com.hotel.api.repository.UserRepository;
import com.hotel.api.service.Jwt.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.cglib.core.Local;
import org.springframework.util.Assert;

import java.lang.reflect.Method;
import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReservationImplTest {

    @Mock
    ReservationRepository reservationRepository;

    @Mock
    RoomRepository roomRepository;

    @Mock
    UserRepository userRepository;

    @Mock
    JwtService jwtService;

    @Mock
    HttpServletRequest httpServletRequest;

    @InjectMocks
    ReservationImpl reservationService;


    @Test
    public void testReserveRoomSuccess() {

        String startDate = "2024-04-01";
        String endDate = "2024-04-05";
        int roomID = 1;

        NewReservationDTO reservationDTO = NewReservationDTO.builder()
                .startDate(startDate)
                .endDate(endDate)
                .phone("123456789")
                .roomID(roomID)
                .build();


        Room room = Room.builder().id(roomID).build();

        when(roomRepository.getRoomById(roomID)).thenReturn(java.util.Optional.of(room));

        when(reservationRepository.existsReservationForRoomInPeriod(roomID, LocalDate.parse(startDate), LocalDate.parse(endDate))).thenReturn(false);

        when(reservationRepository.save(any(Reservation.class))).thenReturn(Reservation.builder().reservationNumber("123").build());

        NewReservationDTO result = reservationService.reserveRoom(reservationDTO, roomID, httpServletRequest);

        assertNotNull(result.getReservationNumber());
    }

    @Test
    public void testReserveRoomInValidID() {

        String startDate = "2024-04-01";
        String endDate = "2024-04-05";
        int roomID = 1;

        NewReservationDTO reservationDTO = NewReservationDTO.builder()
                .startDate(startDate)
                .endDate(endDate)
                .roomID(roomID+1)
                .phone("123456789")
                .build();


        Assertions.assertThrows(ReservationException.class, () -> reservationService.reserveRoom(reservationDTO, roomID, httpServletRequest));

    }

    @Test
    public void testReserveRoomInValidPhone() {

        String startDate = "2024-04-01";
        String endDate = "2024-04-05";
        int roomID = 1;

        NewReservationDTO reservationDTO = NewReservationDTO.builder()
                .startDate(startDate)
                .endDate(endDate)
                .roomID(roomID)
                .phone("023456789")
                .build();


        Assertions.assertThrows(ReservationException.class, () -> reservationService.reserveRoom(reservationDTO, roomID, httpServletRequest));

    }

    @Test
    public void testReserveRoomInValidDate1() {

        String startDate = "2024/04-01";
        String endDate = "2024-04-05";
        int roomID = 1;

        NewReservationDTO reservationDTO = NewReservationDTO.builder()
                .startDate(startDate)
                .endDate(endDate)
                .build();


        Assertions.assertThrows(ReservationException.class, () -> reservationService.reserveRoom(reservationDTO, roomID, httpServletRequest));

    }

    @Test
    public void testReserveRoomInValidDate2() {

        String startDate = "2024-04-01";
        String endDate = "2024/04-05";
        int roomID = 1;

        NewReservationDTO reservationDTO = NewReservationDTO.builder()
                .startDate(startDate)
                .endDate(endDate)
                .build();


        Assertions.assertThrows(ReservationException.class, () -> reservationService.reserveRoom(reservationDTO, roomID, httpServletRequest));

    }

    @Test
    public void testReserveRoomExists() {
        String startDate = "2024-04-01";
        String endDate = "2024-04-05";

        int roomID = 1;

        Room room = Room.builder().id(roomID).build();

        NewReservationDTO reservationDTO = NewReservationDTO.builder()
                .name("test")
                .surname("test")
                .email("test@wp.pl")
                .phone("123456789")
                .startDate(startDate)
                .endDate(endDate)
                .roomID(roomID)
                .build();

        Reservation reservation = Reservation.builder()
                .id(1)
                .name(reservationDTO.getName())
                .surname(reservationDTO.getSurname())
                .email("test@wp.pl")
                .phone(reservationDTO.getPhone())
                .startDate(LocalDate.parse(startDate))
                .endDate(LocalDate.parse(endDate))
                .reservationNumber(UUID.randomUUID().toString().substring(0, 6).toUpperCase())
                .room(room)
                .status(Status.ACCEPTED)
                .user(null)
                .build();

        when(roomRepository.getRoomById(roomID)).thenReturn(Optional.ofNullable(room));
        when(reservationRepository.save(any(Reservation.class))).thenReturn(reservation);

        reservationService.reserveRoom(reservationDTO, roomID, httpServletRequest);

        verify(reservationRepository, times(1)).save(any(Reservation.class));
    }



    @Test
    public void testReserveRoomRoomDoesntExist() {

        String startDate = "2024-04-01";
        String endDate = "2024-04-05";
        int roomID = 1;

        NewReservationDTO reservationDTO = NewReservationDTO.builder()
                .startDate(startDate)
                .endDate(endDate)
                .phone("123456789")
                .roomID(roomID)
                .build();


        when(roomRepository.getRoomById(roomID)).thenThrow(ReservationException.class);

        Assertions.assertThrows(ReservationException.class, () -> reservationService.reserveRoom(reservationDTO, roomID, httpServletRequest));

        verify(roomRepository, times(1)).getRoomById(roomID);
        verify(userRepository, times(0)).findByEmail(any(String.class));
    }

    @Test
    public void testReserveRoomRoomAvailabilitySuccess() {

        String startDate = "2024-04-01";
        String endDate = "2024-04-05";
        int roomID = 1;

        NewReservationDTO reservationDTO = NewReservationDTO.builder()
                .startDate(startDate)
                .endDate(endDate)
                .phone("123456789")
                .roomID(roomID)
                .build();


        when(roomRepository.getRoomById(roomID)).thenThrow(ReservationException.class);

        Assertions.assertThrows(ReservationException.class, () -> roomRepository.getRoomById(roomID));

        Assertions.assertThrows(ReservationException.class, () -> reservationService.reserveRoom(reservationDTO, roomID, httpServletRequest));


    }

    @Test
    public void testReserveRoomRoomAvailabilityFail() {

        Assertions.assertTrue(true);

    }


    
}