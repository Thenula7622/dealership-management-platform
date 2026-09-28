package com.dealershop.repository;

import com.dealershop.entity.ServiceBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ServiceBookingRepository extends JpaRepository<ServiceBooking, Long> {
    List<ServiceBooking> findAllByOrderByCreatedAtDesc();
    List<ServiceBooking> findByCustomerIdOrderByCreatedAtDesc(Long customerId);
    List<ServiceBooking> findByVehicleNumberIgnoreCaseOrderByCreatedAtDesc(String vehicleNumber);
}