package com.dealershop.repository;

import com.dealershop.entity.JobVacancy;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JobVacancyRepository extends JpaRepository<JobVacancy, Long> {
    List<JobVacancy> findAllByOrderByCreatedAtDesc();
    List<JobVacancy> findByStatusOrderByCreatedAtDesc(String status);
}