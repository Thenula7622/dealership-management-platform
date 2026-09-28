package com.dealershop.controller;

import com.dealershop.entity.BusinessConfig;
import com.dealershop.entity.Inquiry;
import com.dealershop.entity.Vehicle;
import com.dealershop.repository.BusinessConfigRepository;
import com.dealershop.repository.InquiryRepository;
import com.dealershop.repository.VehicleRepository;
import com.dealershop.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/inquiries")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.PATCH, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class InquiryController {

    private final InquiryRepository inquiryRepository;
    private final VehicleRepository vehicleRepository;
    private final BusinessConfigRepository configRepository;
    private final EmailService emailService;

    public InquiryController(InquiryRepository inquiryRepository,
                             VehicleRepository vehicleRepository,
                             BusinessConfigRepository configRepository,
                             EmailService emailService) {
        this.inquiryRepository = inquiryRepository;
        this.vehicleRepository = vehicleRepository;
        this.configRepository = configRepository;
        this.emailService = emailService;
    }

    @GetMapping
    public List<Inquiry> getAll() {
        return inquiryRepository.findAllByOrderByCreatedAtDesc();
    }

    @GetMapping("/customer/{customerId}")
    public List<Inquiry> getByCustomer(@PathVariable Long customerId) {
        return inquiryRepository.findByCustomerIdOrderByCreatedAtDesc(customerId);
    }

    @PostMapping
    public ResponseEntity<Inquiry> create(@RequestBody Inquiry inquiry) {
        if (inquiry.getStatus() == null || inquiry.getStatus().isBlank()) {
            inquiry.setStatus("PENDING");
        }
        Inquiry saved = inquiryRepository.save(inquiry);
        return ResponseEntity.ok(saved);
    }

    @RequestMapping(value = "/{id}/status", method = {RequestMethod.PATCH, RequestMethod.PUT, RequestMethod.POST})
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String newStatus = body.get("status");
        return inquiryRepository.findById(id).map(iq -> {
            iq.setStatus(newStatus);
            inquiryRepository.save(iq);
            return ResponseEntity.ok(iq);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (inquiryRepository.existsById(id)) {
            inquiryRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}