package com.hotel.api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class AuthenticationRequest {

    @NotBlank(message = "Email nie może pozostać pusty")
    private String email;

    @NotBlank(message = "Hasło nie może pozostać puste")
    String password;
}
