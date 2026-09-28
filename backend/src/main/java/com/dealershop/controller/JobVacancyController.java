package com.dealershop.controller;

import com.dealershop.entity.JobVacancy;
import com.dealershop.repository.JobVacancyRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vacancies")
@CrossOrigin(origins = "*")
public class JobVacancyController {

    private final JobVacancyRepository repository;

    public JobVacancyController(JobVacancyRepository repository) {
        this.repository = repository;
    }

    // 1. Get all vacancies (Admin view)
    @GetMapping
    public List<JobVacancy> getAll() {
        return repository.findAllByOrderByCreatedAtDesc();
    }

    // 2. Get only OPEN vacancies (Public Careers Page)
    @GetMapping("/open")
    public List<JobVacancy> getOpenVacancies() {
        return repository.findByStatusOrderByCreatedAtDesc("OPEN");
    }

    // 3. Create or Update Vacancy
    @PostMapping
    public ResponseEntity<JobVacancy> saveOrUpdate(@RequestBody JobVacancy vacancy) {
        JobVacancy saved = repository.save(vacancy);
        return ResponseEntity.ok(saved);
    }

    // 4. Delete Vacancy
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}