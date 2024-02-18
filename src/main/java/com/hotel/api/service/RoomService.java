package com.hotel.api.service;

import com.hotel.api.model.Room;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface RoomService {

    Room createRoom(@Valid Room room);

    List<Room> getAvailableRooms(LocalDate dateStart, LocalDate dateEnd);

    Optional<Room> getRoomByID(Integer roomID);

    List<Room> getAllRooms();
}
