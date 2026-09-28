package com.dealershop.repository;

import com.dealershop.entity.SparePart;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SparePartRepository extends JpaRepository<SparePart, Long> {
    List<SparePart> findAllByOrderByCreatedAtDesc();
    List<SparePart> findByCategory(String category);
}