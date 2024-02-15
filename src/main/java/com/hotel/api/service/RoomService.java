package com.hotel.api.service;

import com.hotel.api.dto.RoomDTO;
import com.hotel.api.model.Room;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;

public interface RoomService {

    Room createRoom(@Valid Room room);

    List<Room> getAvailableRooms(LocalDate dateStart, LocalDate dateEnd);

    List<Room> getAllRooms();
}
