package com.dealershop.controller;

import com.dealershop.entity.SparePart;
import com.dealershop.repository.SparePartRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/spare-parts")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class SparePartController {

    private final SparePartRepository repository;

    public SparePartController(SparePartRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<SparePart> getAll() {
        return repository.findAllByOrderByCreatedAtDesc();
    }

    @PostMapping
    public ResponseEntity<SparePart> createPart(@RequestBody SparePart part) {
        if (part.getStockQuantity() == null) part.setStockQuantity(10);
        if (part.getIsAvailable() == null) part.setIsAvailable(true);
        SparePart saved = repository.save(part);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SparePart> updatePart(@PathVariable Long id, @RequestBody SparePart updated) {
        return repository.findById(id).map(part -> {
            part.setName(updated.getName());
            part.setPartNumber(updated.getPartNumber());
            part.setCategory(updated.getCategory());
            part.setPrice(updated.getPrice());
            part.setStockQuantity(updated.getStockQuantity());
            part.setImageUrl(updated.getImageUrl());
            part.setDescription(updated.getDescription());
            part.setCompatibleVehicles(updated.getCompatibleVehicles());
            SparePart saved = repository.save(part);
            return ResponseEntity.ok(saved);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePart(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}