package com.dealershop.controller;

import com.dealershop.entity.StaffMember;
import com.dealershop.repository.StaffMemberRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/staff")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class StaffController {

    private final StaffMemberRepository repository;

    public StaffController(StaffMemberRepository repository) {
        this.repository = repository;
    }

    // Role-based Staff Login Endpoint
    @PostMapping("/login")
    public ResponseEntity<?> staffLogin(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        // Super Admin Hardcoded Fallback
        if ("admin@thenula.lk".equalsIgnoreCase(email) && "admin123".equals(password)) {
            StaffMember rootAdmin = new StaffMember();
            rootAdmin.setId(999L);
            rootAdmin.setFullName("Thenula Rathnayaka (Executive)");
            rootAdmin.setEmail("admin@thenula.lk");
            rootAdmin.setRole("SUPER_ADMIN");
            rootAdmin.setPhoneNumber("0768202700");
            return ResponseEntity.ok(rootAdmin);
        }

        return repository.findByEmail(email).map(member -> {
            if (member.getPassword() != null && member.getPassword().equals(password)) {
                return ResponseEntity.ok(member);
            }
            return ResponseEntity.status(401).body("Invalid Password.");
        }).orElse(ResponseEntity.status(404).body("Staff member not found with this email."));
    }

    @GetMapping
    public List<StaffMember> getAll() {
        return repository.findAllByOrderByCreatedAtDesc();
    }

    @PostMapping
    public ResponseEntity<StaffMember> create(@RequestBody StaffMember staff) {
        if (staff.getPassword() == null || staff.getPassword().isBlank()) {
            staff.setPassword("staff123"); // Default password
        }
        StaffMember saved = repository.save(staff);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StaffMember> update(@PathVariable Long id, @RequestBody StaffMember updated) {
        return repository.findById(id).map(m -> {
            m.setFullName(updated.getFullName());
            m.setEmail(updated.getEmail());
            if (updated.getPassword() != null && !updated.getPassword().isBlank()) {
                m.setPassword(updated.getPassword());
            }
            m.setPhoneNumber(updated.getPhoneNumber());
            m.setRole(updated.getRole());
            m.setSpecialization(updated.getSpecialization());
            m.setMonthlySalary(updated.getMonthlySalary());
            m.setActive(updated.getActive());
            StaffMember saved = repository.save(m);
            return ResponseEntity.ok(saved);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}