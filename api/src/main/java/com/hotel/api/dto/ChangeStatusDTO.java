package com.hotel.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ChangeStatusDTO {

    @NotBlank(message = "Wystąpił błąd w czasie wykonywania akcji")
    private String action;

    @NotNull(message = "Wystąpił błąd związany z id rezerwacji")
    private Integer id;

    @NotBlank(message = "Wystąpił błąd związany z numerem rezerwacji")
    private String reservationNumber;
}
