package com.dealershop.controller;

import com.dealershop.entity.Reservation;
import com.dealershop.repository.ReservationRepository;
import com.dealershop.repository.VehicleRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class ReservationController {

    private final ReservationRepository reservationRepository;
    private final VehicleRepository vehicleRepository;

    public ReservationController(ReservationRepository reservationRepository, VehicleRepository vehicleRepository) {
        this.reservationRepository = reservationRepository;
        this.vehicleRepository = vehicleRepository;
    }

    @GetMapping
    public List<Reservation> getAll() {
        return reservationRepository.findAllByOrderByCreatedAtDesc();
    }

    @PostMapping
    public ResponseEntity<Reservation> createReservation(@RequestBody Reservation res) {
        if (res.getReservationCode() == null || res.getReservationCode().isBlank()) {
            res.setReservationCode("RES-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        res.setStatus("CONFIRMED");
        Reservation saved = reservationRepository.save(res);

        // Auto update vehicle status to RESERVED
        if (res.getVehicleId() != null) {
            vehicleRepository.findById(res.getVehicleId()).ifPresent(v -> {
                v.setStatus("RESERVED");
                vehicleRepository.save(v);
            });
        }

        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (reservationRepository.existsById(id)) {
            reservationRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}