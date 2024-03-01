package com.hotel.api.service.Room;


import com.hotel.api.dto.RoomDTO;
import com.hotel.api.exception.BookRoomDateException;
import com.hotel.api.model.Room;
import com.hotel.api.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RoomImpl implements RoomService {

    @Autowired
    private RoomRepository roomRepository;

    private List<RoomDTO> mapRoomToRoomDTO(List<Room> rooms) {
        return rooms.stream()
                .map(room -> RoomDTO.builder()
                        .id(room.getId())
                        .floorNumber(room.getFloorNumber())
                        .number(room.getNumber())
                        .size(room.getSize())
                        .price(room.getPrice())
                        .name(room.getName())
                        .description(room.getDescription())
                        .picPath(room.getPicPath())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public Room createRoom(@Valid Room room) {
        return roomRepository.save(room);
    }

    @Override
    public List<RoomDTO> getAvailableRooms(String  startDate, String endDate) {

        LocalDate startDateLocal;
        LocalDate endDateLocal;

        try {
            startDateLocal = LocalDate.parse(startDate);
            endDateLocal = LocalDate.parse(endDate);
        } catch (Exception e) {
            throw new BookRoomDateException("Wprowadzono nieporawny format daty");
        }

        if(startDateLocal.isAfter(endDateLocal))
            throw new BookRoomDateException("Data przyjadu musi być wcześniejsza niż data wyjazdu");

        else if(startDateLocal.isBefore(LocalDate.now()))
            throw new BookRoomDateException("Nie można wyszukać ofert z przeszłości");

        return mapRoomToRoomDTO(roomRepository.getAvailableRooms(startDateLocal, endDateLocal));


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
