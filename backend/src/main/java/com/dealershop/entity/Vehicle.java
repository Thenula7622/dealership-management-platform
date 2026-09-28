package com.dealershop.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "vehicles")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private String model;

    private String vehicleType = "CAR";
    private Integer manufactureYear;
    private String conditionType = "USED";
    private String transmission = "AUTOMATIC";
    private String fuelType = "PETROL";
    private Integer engineCapacity;
    private Integer mileageKm;

    @Column(nullable = false)
    private Double price;

    // Feature 4: Financial Metrics (Profit & Loss)
    private Double purchaseCost = 0.0;
    private Double repairCost = 0.0;

    @Column(length = 1000)
    private String imageUrl;

    @Column(length = 3000)
    private String galleryUrls;

    // Feature 2: Certified Inspection Checklist (Scores / Status)
    private Integer engineScore = 95;
    private Integer batteryScore = 90;
    private Integer suspensionScore = 92;
    private Integer bodyPaintScore = 88;
    private String inspectorNotes = "Certified Multi-point Inspection Passed. No structural damage detected.";

    private String status = "AVAILABLE"; // AVAILABLE, RESERVED, SOLD

    private LocalDateTime createdAt = LocalDateTime.now();

    public Vehicle() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public String getVehicleType() { return vehicleType; }
    public void setVehicleType(String vehicleType) { this.vehicleType = vehicleType; }

    public Integer getManufactureYear() { return manufactureYear; }
    public void setManufactureYear(Integer manufactureYear) { this.manufactureYear = manufactureYear; }

    public String getConditionType() { return conditionType; }
    public void setConditionType(String conditionType) { this.conditionType = conditionType; }

    public String getTransmission() { return transmission; }
    public void setTransmission(String transmission) { this.transmission = transmission; }

    public String getFuelType() { return fuelType; }
    public void setFuelType(String fuelType) { this.fuelType = fuelType; }

    public Integer getEngineCapacity() { return engineCapacity; }
    public void setEngineCapacity(Integer engineCapacity) { this.engineCapacity = engineCapacity; }

    public Integer getMileageKm() { return mileageKm; }
    public void setMileageKm(Integer mileageKm) { this.mileageKm = mileageKm; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Double getPurchaseCost() { return purchaseCost; }
    public void setPurchaseCost(Double purchaseCost) { this.purchaseCost = purchaseCost; }

    public Double getRepairCost() { return repairCost; }
    public void setRepairCost(Double repairCost) { this.repairCost = repairCost; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getGalleryUrls() { return galleryUrls; }
    public void setGalleryUrls(String galleryUrls) { this.galleryUrls = galleryUrls; }

    public Integer getEngineScore() { return engineScore; }
    public void setEngineScore(Integer engineScore) { this.engineScore = engineScore; }

    public Integer getBatteryScore() { return batteryScore; }
    public void setBatteryScore(Integer batteryScore) { this.batteryScore = batteryScore; }

    public Integer getSuspensionScore() { return suspensionScore; }
    public void setSuspensionScore(Integer suspensionScore) { this.suspensionScore = suspensionScore; }

    public Integer getBodyPaintScore() { return bodyPaintScore; }
    public void setBodyPaintScore(Integer bodyPaintScore) { this.bodyPaintScore = bodyPaintScore; }

    public String getInspectorNotes() { return inspectorNotes; }
    public void setInspectorNotes(String inspectorNotes) { this.inspectorNotes = inspectorNotes; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}