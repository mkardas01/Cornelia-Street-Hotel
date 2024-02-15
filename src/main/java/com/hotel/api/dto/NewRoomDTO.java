package com.hotel.api.dto;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.hotel.api.model.Reservation;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.List;


@Data
@Builder
public class NewRoomDTO {

    @NotNull(message="Pietro musi byc wieksze niz 0")
    @Min(value = 1)
    @Column(nullable = false)
    private Integer floorNumber;

    @NotNull
    @Min(value = 1)
    @NotNull(message="Numer pokoju musi byc wieksze niz 0")
    private Integer number;

    @NotNull
    @Min(value = 1)
    @NotNull(message="Rozmiar pokoju musi byc wieksze niz 0")
    private Integer size;

}
