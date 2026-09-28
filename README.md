# 🚗 Thenula Enterprises — Next-Gen 3S Automotive DMS & Dealership ERP

[![React](https://img.shields.io/badge/Frontend-React%2018%20%7C%20Vite-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Spring Boot](https://img.shields.io/badge/Backend-Spring%20Boot%203-6DB33F?logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![MySQL](https://img.shields.io/badge/Database-MySQL%208.0-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Deployment](https://img.shields.io/badge/Live%20Demo-Vercel-black?logo=vercel&logoColor=white)](https://dealership-management-platform.vercel.app)

An enterprise-grade Full-Stack Automotive Dealership Management System (DMS) & Enterprise Resource Planning (ERP) platform. Designed for modern vehicle dealerships and workshop service hubs to streamline **Sales (Fleet), Service Center, Spare Parts, Trade-In Valuations, Certified Audits, and Accounting**.

---

## 🌐 Live Interactive Demo
Explore the production demo deployed on Vercel:  
🔗 **[https://dealership-management-platform.vercel.app](https://dealership-management-platform.vercel.app)**

---

## 🔑 Demo Access Credentials (Staff & Admin Panel)

Click **"🔒 Admin"** on the navigation bar to sign in using the quick demo switcher or credentials below:

| Role | Email | Password | Access Scope |
| :--- | :--- | :--- | :--- |
| **👑 Super Admin** | `admin@thenula.lk` | `admin123` | **Full Control:** Financial Ledger (P&L), Invoicing, Staff CRUD, Fleet, Leads |
| **🔧 Workshop Manager** | `service@thenula.lk` | `service123` | **Workshop Operations:** Service Job CRM, Mechanics, Spare Parts Store |
| **💼 Sales Executive** | `sales@thenula.lk` | `sales123` | **Sales Pipeline:** Fleet Inventory, Reservations, Customer Inquiries & Leads |

---

## 🌟 Core Modules & System Features

### 1. 🚗 Showroom Fleet & Inventory Manager
- **Multi-Image Uploads:** Gallery management supporting multiple high-res vehicle views.
- **Certified 100-Point Audit Reports:** Dynamic roadworthiness inspection scorecards and downloadable verification PDFs.
- **Interactive Leasing & EMI Calculator:** Generates official vehicle financing quotations (PDF).
- **Side-by-Side Comparison:** Compare up to 3 vehicles across technical specifications.
- **Customer Wishlist:** Real-time bookmarking for interested buyers.

### 2. 💳 Online Advance Vehicle Hold Gateway
- Instant vehicle reservations preventing double-selling.
- 256-bit SSL simulated card checkout.
- Automated generation of branded **Vehicle Hold & Advance Reservation Slips (PDF)** with 72-hour validity locks.

### 3. 🛠️ Workshop & Service Center CRM
- **Interactive Calendar Slot Booking:** Time-slot reservation engine preventing overbooking.
- **Repair Status Tracker:** End-to-end visibility across 5 stages (`RECEIVED` ➔ `INSPECTION` ➔ `WORK IN PROGRESS` ➔ `READY` ➔ `COMPLETED`).
- **One-Click WhatsApp Updates:** Direct automated repair status notifications to customer phones.

### 4. ⚙️ Spare Parts & Accessories Store
- Genuine OEM parts catalog with real-time stock quantity trackers.
- Multi-category filtering (Filters, Brakes, Lubricants, Electrical).
- Instant WhatsApp direct checkout.

### 5. 🤖 AI Dealership Power Suite
- **AI Showroom & Workshop Advisor:** Context-aware interactive assistant connected to live inventory.
- **Voice-Enabled Speech Search:** Multi-language voice queries via web speech recognition.
- **AI Smart Market Valuation & Cash Offer:** Real-world Sri Lankan automotive heuristics estimating market price ranges and instant showroom buy-out offers.
- **AI Computer Vision Damage Scanner:** Surface damage and dent estimation based on vehicle imagery.
- **✨ AI Marketing Ad Copy Generator:** One-click bilingual (English & Sinhala) sales copy generator for social media and classifieds.

### 6. 🖨️ Dealership Invoicing & Financial Accounting
- Branded dealership sales receipts and tax invoices generated dynamically via client-side PDF rendering.
- Real-time gross profit, net margin, and unit cost ledger tracking.

---

## 🛠️ Technology Stack & Architecture

- **Frontend:** React 18, Vite, Tailwind CSS, Lucide Icons, jsPDF.
- **Backend (API Layer):** Java 17, Spring Boot 3.x, Spring Data JPA, RESTful Micro-services.
- **Database:** MySQL 8.0 with automated entity schema generation (`ddl-auto`).
- **Security & RBAC:** Multi-tier role-based access control.
- **Hosting & CI/CD:** Vercel (Frontend Demo), GitHub Actions.

---

## 💻 Local Setup & Execution Guide

### Prerequisites
- Node.js (v18+)
- Java JDK 17+
- MySQL Server 8.0

### 1. Database Setup
```sql
CREATE DATABASE dealershop_db;
