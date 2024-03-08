package com.hotel.api.controller;

import com.hotel.api.service.Room.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/room")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @GetMapping("/find")
    @ResponseBody
    @CrossOrigin
    public ResponseEntity<?> findAvailableRooms(@RequestParam("startDate") String startDate,
                                                @RequestParam("endDate") String endDate,
                                                @RequestParam("size") Integer size) {


        return new ResponseEntity<>(roomService.getAvailableRooms(startDate, endDate, size), HttpStatus.OK);
    }


}
