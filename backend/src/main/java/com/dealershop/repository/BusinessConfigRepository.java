package com.dealershop.repository;

import com.dealershop.entity.BusinessConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusinessConfigRepository extends JpaRepository<BusinessConfig, Long> {
}