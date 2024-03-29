package com.hotel.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;


import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class NewReservationDTO {

    @NotBlank(message = "Imię nie może pozostać puste")
    private String name;

    @NotBlank(message = "Nazwisko nie może pozostać puste")
    private String surname;

    @NotBlank(message = "E-mail nie może pozostać pusty")
    @Email(message = "Podano nie poprawny email")
    private String email;

    @NotBlank(message = "Numer telefonu nie może pozostać pusty")
    @Length(min=9, max=9)
    private String phone;

    @NotNull(message = "Błąd w czasie przesyłania formularza")
    private Integer roomID;

    @NotBlank(message = "Data przyjazdu nie może być pusta")
    private String startDate;

    @NotBlank(message = "Data wyjazdu nie możę być pusta")
    private String endDate;

    @Builder.Default
    private String reservationNumber = null;

}
