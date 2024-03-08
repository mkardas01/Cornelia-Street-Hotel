package com.hotel.api.service.Room;


import com.hotel.api.dto.RoomDTO;
import com.hotel.api.exception.BookRoomDateException;
import com.hotel.api.mapper.Mapper;
import com.hotel.api.model.Room;
import com.hotel.api.model.reservation.Status;
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

    private final Mapper mapper = new Mapper();


    @Override
    public List<RoomDTO> getAvailableRooms(String  startDate, String endDate, Integer size) {

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

        return mapper.mapRoomToRoomDTO(roomRepository.getAvailableRooms(startDateLocal, endDateLocal, size, Status.CANCELED, Status.CANCEL_ACCEPTED, Status.NOT_ARRIVED));


    }

}
