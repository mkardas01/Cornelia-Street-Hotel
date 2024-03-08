package com.hotel.api.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.*;


@AllArgsConstructor
@Data
@Builder
public class RoomDTO {

    private Integer id;

    private Integer floorNumber;

    private Integer number;

    private Integer size;

    private Integer price;

    private String name;

    private String description;

    private String picPath;

}
