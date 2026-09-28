package com.dealershop.controller;

import com.dealershop.entity.BusinessConfig;
import com.dealershop.repository.BusinessConfigRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/config")
@CrossOrigin(origins = "*")
public class BusinessConfigController {

    private final BusinessConfigRepository repo;

    public BusinessConfigController(BusinessConfigRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public ResponseEntity<BusinessConfig> getConfig() {
        return repo.findAll().stream().findFirst()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<BusinessConfig> updateConfig(@PathVariable Long id, @RequestBody BusinessConfig config) {
        config.setId(id);
        return ResponseEntity.ok(repo.save(config));
    }
}