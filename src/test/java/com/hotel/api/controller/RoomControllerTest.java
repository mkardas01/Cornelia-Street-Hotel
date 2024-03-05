package com.hotel.api.controller;

import com.hotel.api.exception.BookRoomDateException;
import com.hotel.api.service.Room.RoomService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;

@SpringBootTest
public class RoomControllerTest {

    @InjectMocks
    private RoomController roomController;

    @Mock
    private RoomService roomService;

//    @Test
//    public void testFindAvailableRooms_Success() {
//        // Arrange
//        LocalDate startDate = LocalDate.now();
//        LocalDate endDate = startDate.plusDays(1);
//
//        List<Room> availableRooms = new ArrayList<>();
//        availableRooms.add(Room.builder().id(1).number(2).floorNumber(3).name("test").price(200).build());
//
//        when(roomService.getAvailableRooms(startDate, endDate)).thenReturn(availableRooms);
//
//        ResponseEntity<?> response = roomController.findAvailableRooms(startDate.toString(), endDate.toString());
//
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//    }

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
