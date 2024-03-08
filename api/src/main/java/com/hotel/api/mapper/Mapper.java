package com.hotel.api.mapper;

import com.hotel.api.dto.RoomDTO;
import com.hotel.api.model.reservation.Reservation;
import com.hotel.api.model.ReservationDTO;
import com.hotel.api.model.Room;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;


@Data
@NoArgsConstructor
public class Mapper {

    public List<RoomDTO> mapRoomToRoomDTO(List<Room> rooms) {
        return rooms.stream()
                .map(room -> RoomDTO.builder()
                        .id(room.getId())
                        .floorNumber(room.getFloorNumber())
                        .number(room.getNumber())
                        .size(room.getSize())
                        .price(room.getPrice())
                        .name(room.getName())
                        .description(room.getDescription())
                        .picPath(room.getPicPath())
                        .build())
                .collect(Collectors.toList());
    }

    public List<ReservationDTO> mapToReservationDTO(List<Reservation> reservations) {
        return reservations.stream()
                .map(reservation -> ReservationDTO.builder()
                        .id(reservation.getId())
                        .name(reservation.getName())
                        .surname(reservation.getSurname())
                        .email(reservation.getEmail())
                        .phone(reservation.getPhone())
                        .startDate(reservation.getStartDate())
                        .endDate(reservation.getEndDate())
                        .reservationNumber(reservation.getReservationNumber())
                        .status(reservation.getStatus())
                        .room(mapToRoomDTO(reservation.getRoom()))
                        .build())
                .collect(Collectors.toList());
    }

    public ReservationDTO mapToReservationDTO(Reservation reservation) {
        return ReservationDTO.builder()
                        .id(reservation.getId())
                        .name(reservation.getName())
                        .surname(reservation.getSurname())
                        .email(reservation.getEmail())
                        .phone(reservation.getPhone())
                        .startDate(reservation.getStartDate())
                        .endDate(reservation.getEndDate())
                        .reservationNumber(reservation.getReservationNumber())
                        .status(reservation.getStatus())
                        .room(mapToRoomDTO(reservation.getRoom()))
                        .build();
    }

    private RoomDTO mapToRoomDTO(Room room) {
        return RoomDTO.builder()
                .id(room.getId())
                .floorNumber(room.getFloorNumber())
                .number(room.getNumber())
                .size(room.getSize())
                .price(room.getPrice())
                .name(room.getName())
                .description(room.getDescription())
                .picPath(room.getPicPath())
                .build();
    }


}
