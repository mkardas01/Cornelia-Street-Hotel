package com.hotel.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class RegisterRequest {

    @NotBlank(message = "Imię nie może pozostać puste")
    private String name;

    @NotBlank(message = "Nazwisko nie może pozostać puste")
    private String surname;

    @NotBlank(message = "Email nie może pozostać pusty")
    @Email()
    private String email;

    @NotBlank(message = "Hasło nie może pozostać puste")
    @Length(min = 8, message = "Hasło musi zawierać conajmniej 8 znaków")
    private String password;


}
