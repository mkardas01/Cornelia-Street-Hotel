package com.hotel.api.repository;

import com.hotel.api.model.Reservation;
import com.hotel.api.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    @Query("SELECT COUNT(r) > 0 FROM Reservation r " +
            "WHERE r.room.id = :roomId AND " +
            "(:endDate > r.startDate AND :startDate < r.endDate)")
    boolean existsReservationForRoomInPeriod(int roomId, LocalDate startDate, LocalDate endDate);



    Optional<List<Reservation>> getReservationByUserId(Integer userID);

}
