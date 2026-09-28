package com.dealershop.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "spare_parts")
public class SparePart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String partNumber; // e.g. TOY-04152-YZZA6

    private String category; // FILTERS, BRAKES, LUBRICANTS, ELECTRICAL, ACCESSORIES
    private String compatibleVehicles; // e.g. Toyota Vitz, Aqua, Premio

    @Column(nullable = false)
    private Double price;

    private Integer stockQuantity = 10;
    private String imageUrl;

    @Column(length = 1000)
    private String description;

    private Boolean isAvailable = true;

    private LocalDateTime createdAt = LocalDateTime.now();

    public SparePart() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPartNumber() { return partNumber; }
    public void setPartNumber(String partNumber) { this.partNumber = partNumber; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getCompatibleVehicles() { return compatibleVehicles; }
    public void setCompatibleVehicles(String compatibleVehicles) { this.compatibleVehicles = compatibleVehicles; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Integer getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Boolean getIsAvailable() { return isAvailable; }
    public void setIsAvailable(Boolean isAvailable) { this.isAvailable = isAvailable; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}