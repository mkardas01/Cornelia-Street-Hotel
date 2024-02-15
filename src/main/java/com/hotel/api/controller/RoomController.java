package com.hotel.api.controller;

import com.hotel.api.dto.NewRoomDTO;
import com.hotel.api.dto.RoomDTO;
import com.hotel.api.exception.RoomExceptionHandler;
import com.hotel.api.model.Room;
import com.hotel.api.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/room")
public class RoomController {

    private Room mapToPost(NewRoomDTO roomDTO){
        return Room.builder()
                .floorNumber(roomDTO.getFloorNumber())
                .size(roomDTO.getSize())
                .number(roomDTO.getNumber())
                .build();
    }

    private List<RoomDTO> mapToPostDTO(List<Room> rooms) {
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

    @Autowired
    private RoomService roomService;

    @GetMapping("/find")
    @ResponseBody
    @CrossOrigin
    public ResponseEntity<?> findAvailableRooms(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate) {
        List<RoomDTO> availableRooms = mapToPostDTO(roomService.getAvailableRooms(LocalDate.parse(startDate), LocalDate.parse(endDate)));
        return new ResponseEntity<>(availableRooms, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addNewRoom(@Valid @RequestBody NewRoomDTO roomDTO){

        return new ResponseEntity<>(roomService.createRoom(mapToPost(roomDTO)), HttpStatus.CREATED);
    }


}
