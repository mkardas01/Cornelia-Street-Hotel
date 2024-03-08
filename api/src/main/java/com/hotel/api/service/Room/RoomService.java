package com.hotel.api.service.Room;

import com.hotel.api.dto.RoomDTO;
import com.hotel.api.model.Room;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

public interface RoomService {

    List<RoomDTO> getAvailableRooms(String  startDate, String endDate, Integer size);


}
