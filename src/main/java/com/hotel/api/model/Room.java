package com.hotel.api.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.hotel.api.model.reservation.Reservation;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "rooms")
@Builder
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private Integer floorNumber;

    @Column(nullable = false, unique = true)
    private Integer number;

    @Column(nullable = false)
    private Integer size;

    @Column(nullable = false)
    private Integer price;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String picPath;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "room", cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private List<Reservation> reservations;


}
