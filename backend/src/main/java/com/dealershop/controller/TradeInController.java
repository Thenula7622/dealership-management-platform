package com.dealershop.controller;

import com.dealershop.entity.TradeInRequest;
import com.dealershop.repository.TradeInRequestRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/trade-ins")
@CrossOrigin(origins = "*")
public class TradeInController {

    private final TradeInRequestRepository repository;

    public TradeInController(TradeInRequestRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<TradeInRequest> getAll() {
        return repository.findAllByOrderByCreatedAtDesc();
    }

    @GetMapping("/customer/{customerId}")
    public List<TradeInRequest> getByCustomer(@PathVariable Long customerId) {
        return repository.findByCustomerIdOrderByCreatedAtDesc(customerId);
    }

    @PostMapping
    public ResponseEntity<TradeInRequest> create(@RequestBody TradeInRequest req) {
        if (req.getStatus() == null) req.setStatus("PENDING");
        TradeInRequest saved = repository.save(req);
        return ResponseEntity.ok(saved);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateOffer(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        return repository.findById(id).map(item -> {
            if (body.containsKey("status")) item.setStatus(body.get("status").toString());
            if (body.containsKey("offer") && body.get("offer") != null) {
                item.setShowroomValuationOffer(Double.parseDouble(body.get("offer").toString()));
            }
            TradeInRequest saved = repository.save(item);
            return ResponseEntity.ok(saved);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}