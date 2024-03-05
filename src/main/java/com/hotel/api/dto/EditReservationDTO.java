package com.hotel.api.dto;

import com.hotel.api.model.reservation.Status;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;


@Data
public class EditReservationDTO {

    @NotNull(message = "Wystąpił problem z ID pokoju")
    private Integer id;

    @NotBlank(message = "Wystąpił problem z imieniem")
    private String name;

    @NotBlank(message = "Wystąpił problem z nazwiskiem")
    private String surname;

    @NotBlank(message = "Wystąpił problem z emailem")
    private String email;

    @NotBlank(message = "Wystąpił problem z numerem telefonu")
    private String phone;

    @NotBlank(message = "Wystąpił problem z numerem rezerwacji")
    private String reservationNumber;


}
