package com.hotel.api.repository;

import com.hotel.api.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    @Query("SELECT res " +
            "FROM Reservation res " +
            "WHERE (res.startDate >= :dateStart OR res.endDate < :dateEnd) AND res.room.id = :roomID"
    )
    List<Reservation> isRoomNotReserved(@Param("dateStart") LocalDate dateStart, @Param("dateEnd") LocalDate dateEnd, @Param("roomID") Integer roomID);




}
