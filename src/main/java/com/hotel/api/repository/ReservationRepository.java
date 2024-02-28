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

    boolean existsByRoomIdAndEndDateAfterAndStartDateBeforeOrStartDateEqualsAndEndDateAfter(
            int room_id, LocalDate endDate, LocalDate startDate, LocalDate startDate2, LocalDate endDate2
    );


    Optional<List<Reservation>> getReservationByUserId(Integer userID);

}
