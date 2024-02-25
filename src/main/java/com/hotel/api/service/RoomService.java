package com.hotel.api.service;

import com.hotel.api.dto.RoomDTO;
import com.hotel.api.model.Room;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

public interface RoomService {

    Room createRoom(@Valid Room room);

    List<RoomDTO> getAvailableRooms(String  startDate, String endDate);

    Optional<Room> getRoomByID(Integer roomID);

    List<Room> getAllRooms();
}
