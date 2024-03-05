package com.hotel.api.controller;

import com.hotel.api.service.Room.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/room")
public class RoomController {

//    private Room mapNewRoomDTOToRoom(NewRoomDTO roomDTO){
//        return Room.builder()
//                .floorNumber(roomDTO.getFloorNumber())
//                .size(roomDTO.getSize())
//                .number(roomDTO.getNumber())
//                .build();
//    }



    @Autowired
    private RoomService roomService;

    @GetMapping("/find")
    @ResponseBody
    @CrossOrigin
    public ResponseEntity<?> findAvailableRooms(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate) {


        return new ResponseEntity<>(roomService.getAvailableRooms(startDate, endDate), HttpStatus.OK);
    }


//
//    @PostMapping("/add")
//    public ResponseEntity<?> addNewRoom(@Valid @RequestBody NewRoomDTO roomDTO){
//
//        return new ResponseEntity<>(roomService.createRoom(mapNewRoomDTOToRoom(roomDTO)), HttpStatus.CREATED);
//    }


}
