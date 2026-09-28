package com.dealershop.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "business_config")
@Data
public class BusinessConfig {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String businessName;
    private String tagline;
    private String contactPhone;
    private String whatsappNumber;
    private String email;
    private String address;
    private String currencyCode;
}