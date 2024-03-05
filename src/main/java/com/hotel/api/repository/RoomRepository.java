package com.hotel.api.repository;

import com.hotel.api.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {

    @Query("SELECT r FROM Room r " +
            "LEFT JOIN r.reservations res " +
            "WHERE (res.startDate IS NULL OR res.endDate < :dateStart OR res.startDate > :dateEnd) AND r.size = :size")
    List<Room> getAvailableRooms(@Param("dateStart") LocalDate dateStart, @Param("dateEnd") LocalDate dateEnd, @Param("size") Integer size);


    Optional<Room> getRoomById(Integer id);

}
