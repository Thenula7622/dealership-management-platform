package com.dealershop.repository;

import com.dealershop.entity.TradeInRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TradeInRequestRepository extends JpaRepository<TradeInRequest, Long> {
    List<TradeInRequest> findAllByOrderByCreatedAtDesc();
    List<TradeInRequest> findByCustomerIdOrderByCreatedAtDesc(Long customerId);
}