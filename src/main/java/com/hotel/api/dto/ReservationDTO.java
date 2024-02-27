package com.hotel.api.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.hotel.api.dto.RoomDTO;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Data
@Builder
public class ReservationDTO {

    private Integer id;

    private String name;

    private String surname;

    private String email;

    private String phone;

    private LocalDate startDate;

    private LocalDate endDate;

    private String reservationNumber;

    private RoomDTO room;

}

