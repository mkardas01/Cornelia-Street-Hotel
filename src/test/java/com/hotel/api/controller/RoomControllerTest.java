package com.hotel.api.controller;

import com.hotel.api.controller.RoomController;
import com.hotel.api.exception.BookRoomDateException;
import com.hotel.api.model.Room;
import com.hotel.api.service.RoomService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
public class RoomControllerTest {

    @InjectMocks
    private RoomController roomController;

    @Mock
    private RoomService roomService;

    @Test
    public void testFindAvailableRooms_Success() {
        // Arrange
        LocalDate startDate = LocalDate.now();
        LocalDate endDate = startDate.plusDays(1);

        List<Room> availableRooms = new ArrayList<>();
        availableRooms.add(Room.builder().id(1).number(2).floorNumber(3).name("test").price(200).build());

        when(roomService.getAvailableRooms(startDate, endDate)).thenReturn(availableRooms);

        ResponseEntity<?> response = roomController.findAvailableRooms(startDate.toString(), endDate.toString());

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testFindAvailableRooms_InvalidDateFormat() {
        // Arrange
        String invalidStartDate = "invalid_date";
        String invalidEndDate = "invalid_date";

        // Act & Assert
        assertThrows(BookRoomDateException.class, () -> {
            roomController.findAvailableRooms(invalidStartDate, invalidEndDate);
        });
    }

    @Test
    public void testFindAvailableRooms_EndDateBeforeStartDate() {
        // Arrange
        LocalDate startDate = LocalDate.now();
        LocalDate endDate = startDate.minusDays(1);

        // Act & Assert
        assertThrows(BookRoomDateException.class, () -> {
            roomController.findAvailableRooms(startDate.toString(), endDate.toString());
        });
    }

    @Test
    public void testFindAvailableRooms_StartDateInPast() {
        LocalDate startDate = LocalDate.now().minusDays(1);
        LocalDate endDate = startDate.plusDays(1);

        assertThrows(BookRoomDateException.class, () -> {
            roomController.findAvailableRooms(startDate.toString(), endDate.toString());
        });
    }



}
