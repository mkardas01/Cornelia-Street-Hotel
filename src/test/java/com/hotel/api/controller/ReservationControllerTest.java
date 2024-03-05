package com.hotel.api.controller;

import com.hotel.api.service.Reservation.ReservationService;
import com.hotel.api.service.Room.RoomService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

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
