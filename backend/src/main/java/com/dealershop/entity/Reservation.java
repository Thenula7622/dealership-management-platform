package com.dealershop.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "vehicle_reservations")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String reservationCode; // e.g. RES-2026-0042

    @Column(nullable = false)
    private Long vehicleId;

    @Column(nullable = false)
    private String vehicleTitle;

    @Column(nullable = false)
    private String customerName;

    @Column(nullable = false)
    private String customerPhone;

    private String customerEmail;
    private Double advanceAmountPaid;
    private String paymentMethod; // PAYHERE_VISA_MASTER, CASH, BANK_TRANSFER
    private String paymentReference;
    private String status = "CONFIRMED"; // CONFIRMED, COMPLETED, CANCELLED

    private LocalDateTime createdAt = LocalDateTime.now();

    public Reservation() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getReservationCode() { return reservationCode; }
    public void setReservationCode(String reservationCode) { this.reservationCode = reservationCode; }

    public Long getVehicleId() { return vehicleId; }
    public void setVehicleId(Long vehicleId) { this.vehicleId = vehicleId; }

    public String getVehicleTitle() { return vehicleTitle; }
    public void setVehicleTitle(String vehicleTitle) { this.vehicleTitle = vehicleTitle; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getCustomerPhone() { return customerPhone; }
    public void setCustomerPhone(String customerPhone) { this.customerPhone = customerPhone; }

    public String getCustomerEmail() { return customerEmail; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }

    public Double getAdvanceAmountPaid() { return advanceAmountPaid; }
    public void setAdvanceAmountPaid(Double advanceAmountPaid) { this.advanceAmountPaid = advanceAmountPaid; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getPaymentReference() { return paymentReference; }
    public void setPaymentReference(String paymentReference) { this.paymentReference = paymentReference; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}