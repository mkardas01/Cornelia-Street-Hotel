package com.hotel.api.repository;

import com.hotel.api.model.reservation.Reservation;
import com.hotel.api.model.reservation.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static com.hotel.api.model.reservation.Status.ACCEPTED;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    @Query("SELECT COUNT(r) > 0 FROM Reservation r " +
            "WHERE r.room.id = :roomId AND " +
            "(:endDate > r.startDate AND :startDate < r.endDate)")
    boolean existsReservationForRoomInPeriod(int roomId, LocalDate startDate, LocalDate endDate);


    Optional<List<Reservation>> getReservationByStartDate(LocalDate startDay);
    Optional<List<Reservation>> getReservationByUserId(Integer userID);

    @Query("SELECT r FROM Reservation r " +
            "WHERE " +
            "(:reservationNumber is null or r.reservationNumber = :reservationNumber) " +
            "AND (:email is null or r.email = :email) " +
            "AND (:surname is null or r.surname = :surname) " +
            "AND (:startDate is null or r.startDate = :startDate) " +
            "AND (:endDate is null or r.endDate = :endDate)")
    Optional<List<Reservation>> getReservation(@Param("reservationNumber") String reservationNumber,
                                               @Param("email") String email,
                                               @Param("surname") String surname,
                                               @Param("startDate") LocalDate startDate,
                                               @Param("endDate") LocalDate endDate);

    Optional<List<Reservation>> findReservationByStatus(Status status);
}
