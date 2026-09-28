package com.dealershop.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "trade_in_requests")
public class TradeInRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long customerId;

    @Column(nullable = false)
    private String customerName;

    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private String vehicleBrand;

    @Column(nullable = false)
    private String vehicleModel;

    @Column(nullable = false)
    private Integer manufactureYear;

    private Integer mileageKm;
    private Double expectedPrice;

    private String targetExchangeVehicle; // වාහනයක් මාරු කරගන්නවා නම් ඒ වාහනයේ නම

    @Column(length = 1000)
    private String vehicleConditionNotes;

    private String vehicleImageUrl;

    private String status = "PENDING"; // PENDING, EVALUATING, OFFERED, REJECTED, COMPLETED

    private Double showroomValuationOffer;

    private LocalDateTime createdAt = LocalDateTime.now();

    public TradeInRequest() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getVehicleBrand() { return vehicleBrand; }
    public void setVehicleBrand(String vehicleBrand) { this.vehicleBrand = vehicleBrand; }

    public String getVehicleModel() { return vehicleModel; }
    public void setVehicleModel(String vehicleModel) { this.vehicleModel = vehicleModel; }

    public Integer getManufactureYear() { return manufactureYear; }
    public void setManufactureYear(Integer manufactureYear) { this.manufactureYear = manufactureYear; }

    public Integer getMileageKm() { return mileageKm; }
    public void setMileageKm(Integer mileageKm) { this.mileageKm = mileageKm; }

    public Double getExpectedPrice() { return expectedPrice; }
    public void setExpectedPrice(Double expectedPrice) { this.expectedPrice = expectedPrice; }

    public String getTargetExchangeVehicle() { return targetExchangeVehicle; }
    public void setTargetExchangeVehicle(String targetExchangeVehicle) { this.targetExchangeVehicle = targetExchangeVehicle; }

    public String getVehicleConditionNotes() { return vehicleConditionNotes; }
    public void setVehicleConditionNotes(String vehicleConditionNotes) { this.vehicleConditionNotes = vehicleConditionNotes; }

    public String getVehicleImageUrl() { return vehicleImageUrl; }
    public void setVehicleImageUrl(String vehicleImageUrl) { this.vehicleImageUrl = vehicleImageUrl; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Double getShowroomValuationOffer() { return showroomValuationOffer; }
    public void setShowroomValuationOffer(Double showroomValuationOffer) { this.showroomValuationOffer = showroomValuationOffer; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}