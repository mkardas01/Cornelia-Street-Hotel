package com.hotel.api.repository;

import com.hotel.api.dto.RoomDTO;
import com.hotel.api.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {
    @Query("SELECT r.id AS id, r.floorNumber AS floorNumber, r.number AS number, r.size AS size FROM Room r")
    List<Room> getAllRoomInfos();

    @Query("SELECT " +
            "r " +
            "FROM Room r " +
            "LEFT JOIN r.reservations res " +
            "WHERE (res.startDate IS NULL OR res.startDate > :dateEnd OR res.endDate < :dateStart)"
    )
    List<Room> getAvailableRooms(@Param("dateStart") LocalDate dateStart, @Param("dateEnd") LocalDate dateEnd);

}
