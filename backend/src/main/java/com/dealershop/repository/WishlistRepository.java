package com.dealershop.repository;

import com.dealershop.entity.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface WishlistRepository extends JpaRepository<WishlistItem, Long> {
    List<WishlistItem> findByCustomerId(Long customerId);
    Optional<WishlistItem> findByCustomerIdAndVehicleId(Long customerId, Long vehicleId);

    @Transactional
    void deleteByCustomerIdAndVehicleId(Long customerId, Long vehicleId);
}