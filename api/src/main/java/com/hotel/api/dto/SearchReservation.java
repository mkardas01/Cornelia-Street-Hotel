package com.hotel.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;


@AllArgsConstructor
@Data
@Builder
public class SearchReservation {

    private String reservationNumber;
    private String email;
    private String surname;
    private String startDate;
    private String endDate;

}
