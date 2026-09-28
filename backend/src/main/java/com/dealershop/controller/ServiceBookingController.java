package com.dealershop.controller;

import com.dealershop.entity.ServiceBooking;
import com.dealershop.repository.ServiceBookingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "*")
public class ServiceBookingController {

    private final ServiceBookingRepository repository;

    public ServiceBookingController(ServiceBookingRepository repository) {
        this.repository = repository;
    }

    // 1. Get all bookings for Admin
    @GetMapping
    public List<ServiceBooking> getAll() {
        return repository.findAllByOrderByCreatedAtDesc();
    }

    // 2. Track service by Vehicle Number (Public Live Tracker)
    @GetMapping("/track/{vehicleNumber}")
    public List<ServiceBooking> trackVehicle(@PathVariable String vehicleNumber) {
        return repository.findByVehicleNumberIgnoreCaseOrderByCreatedAtDesc(vehicleNumber.trim());
    }

    // 3. Customer bookings
    @GetMapping("/customer/{customerId}")
    public List<ServiceBooking> getByCustomer(@PathVariable Long customerId) {
        return repository.findByCustomerIdOrderByCreatedAtDesc(customerId);
    }

    // 4. Create new service appointment
    @PostMapping
    public ResponseEntity<ServiceBooking> create(@RequestBody ServiceBooking booking) {
        if (booking.getStatus() == null || booking.getStatus().isBlank()) {
            booking.setStatus("RECEIVED");
        }
        ServiceBooking saved = repository.save(booking);
        return ResponseEntity.ok(saved);
    }

    // 5. Update Status & Cost (Both PUT & PATCH supported)
    @RequestMapping(value = "/{id}/status", method = {RequestMethod.PUT, RequestMethod.PATCH, RequestMethod.POST})
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        return repository.findById(id).map(booking -> {
            if (updates.containsKey("status") && updates.get("status") != null) {
                booking.setStatus(updates.get("status").toString().trim());
            }
            if (updates.containsKey("estimatedCost") && updates.get("estimatedCost") != null && !updates.get("estimatedCost").toString().isBlank()) {
                booking.setEstimatedCost(Double.parseDouble(updates.get("estimatedCost").toString().trim()));
            }
            ServiceBooking saved = repository.save(booking);
            return ResponseEntity.ok(saved);
        }).orElse(ResponseEntity.notFound().build());
    }

    // 6. Delete booking
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}