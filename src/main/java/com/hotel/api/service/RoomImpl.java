package com.hotel.api.service;


import com.hotel.api.model.Room;
import com.hotel.api.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class RoomImpl implements RoomService {

    @Autowired
    private RoomRepository roomRepository;


    @Override
    public Room createRoom(@Valid Room room) {
        return roomRepository.save(room);
    }

    @Override
    public List<Room> getAvailableRooms(LocalDate dateStart, LocalDate dateEnd) {
        return roomRepository.getAvailableRooms(dateStart, dateEnd);
    }

    @Override
    public Optional<Room> getRoomByID(Integer roomID) {
        return roomRepository.findById(roomID);
    }

    @Override
    public List<Room> getAllRooms() {

        return roomRepository.getAllRoomInfos();
    }
}
