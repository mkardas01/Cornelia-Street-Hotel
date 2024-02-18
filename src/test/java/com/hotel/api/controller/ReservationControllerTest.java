package com.hotel.api.controller;

import com.hotel.api.dto.NewReservationDTO;
import com.hotel.api.model.Reservation;
import com.hotel.api.model.Room;
import com.hotel.api.service.ReservationService;
import com.hotel.api.service.RoomService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
public class ReservationControllerTest {

    @MockBean
    private RoomService roomService;

    @MockBean
    private ReservationService reservationService;

    @Test
    public void testReserveRoom() {


    }
}
