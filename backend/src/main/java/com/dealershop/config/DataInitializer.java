package com.dealershop.config;

import com.dealershop.entity.BusinessConfig;
import com.dealershop.entity.StaffMember;
import com.dealershop.entity.Vehicle;
import com.dealershop.repository.BusinessConfigRepository;
import com.dealershop.repository.StaffMemberRepository;
import com.dealershop.repository.VehicleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initBusinessConfig(BusinessConfigRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                BusinessConfig config = new BusinessConfig();
                config.setBusinessName("Thenula Enterprises");
                config.setTagline("Premium & Verified Automotive Hub");
                config.setAddress("Mawathagama, Sri Lanka");
                config.setContactPhone("94 76 820 2700");
                config.setWhatsappNumber("94768202700");
                config.setEmail("thenula2002@gmail.com");
                config.setCurrencyCode("LKR");
                repository.save(config);
                System.out.println("[CONFIG INITIALIZED]: Default showroom configuration loaded.");
            }
        };
    }

    @Bean
    public CommandLineRunner initStaff(StaffMemberRepository staffRepo) {
        return args -> {
            if (staffRepo.count() == 0) {
                // 1. Super Admin
                StaffMember admin = new StaffMember();
                admin.setFullName("Thenula Rathnayaka");
                admin.setEmail("admin@thenula.lk");
                admin.setPassword("admin123");
                admin.setPhoneNumber("0768202700");
                admin.setRole("SUPER_ADMIN");
                admin.setSpecialization("Dealership Management");
                admin.setMonthlySalary(250000.0);
                staffRepo.save(admin);

                // 2. Workshop Manager
                StaffMember wm = new StaffMember();
                wm.setFullName("Nimal Perera");
                wm.setEmail("service@thenula.lk");
                wm.setPassword("service123");
                wm.setPhoneNumber("0771234567");
                wm.setRole("WORKSHOP_MANAGER");
                wm.setSpecialization("Lead Automobile Engineer");
                wm.setMonthlySalary(140000.0);
                staffRepo.save(wm);

                // 3. Sales Executive
                StaffMember sales = new StaffMember();
                sales.setFullName("Ruwan Silva");
                sales.setEmail("sales@thenula.lk");
                sales.setPassword("sales123");
                sales.setPhoneNumber("0719876543");
                sales.setRole("SALES_EXECUTIVE");
                sales.setSpecialization("Fleet & Lease Consultant");
                sales.setMonthlySalary(110000.0);
                staffRepo.save(sales);

                System.out.println("[STAFF INITIALIZED]: Default Super Admin, Workshop Manager & Sales Accounts Seeded!");
            }
        };
    }

    @Bean
    public CommandLineRunner initVehicles(VehicleRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                List<Vehicle> sampleVehicles = new ArrayList<>();

                sampleVehicles.add(createVehicle("Toyota Vitz Safety Edition 2018", "Toyota", "Vitz", "CAR",
                        2018, "USED", "AUTOMATIC", "PETROL", 1000, 48000, 7850000.0,
                        "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1000&q=80"));

                sampleVehicles.add(createVehicle("Honda Vezel Z Grade 2015", "Honda", "Vezel", "CAR",
                        2015, "USED", "AUTOMATIC", "HYBRID", 1500, 72000, 11500000.0,
                        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80"));

                sampleVehicles.add(createVehicle("Toyota Premio G Superior 2018", "Toyota", "Premio", "CAR",
                        2018, "USED", "AUTOMATIC", "PETROL", 1500, 52000, 19500000.0,
                        "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1000&q=80"));

                repository.saveAll(sampleVehicles);
                System.out.println("[SAMPLE VEHICLES LOADED]: Showroom fleet successfully seeded into MySQL!");
            }
        };
    }

    private Vehicle createVehicle(String title, String brand, String model, String vehicleType,
                                  int year, String condition, String transmission, String fuel,
                                  int cc, int mileage, Double price, String img) {
        Vehicle v = new Vehicle();
        v.setTitle(title);
        v.setBrand(brand);
        v.setModel(model);
        v.setVehicleType(vehicleType);
        v.setManufactureYear(year);
        v.setConditionType(condition);
        v.setTransmission(transmission);
        v.setFuelType(fuel);
        v.setEngineCapacity(cc);
        v.setMileageKm(mileage);
        v.setPrice(price);
        v.setPurchaseCost(price * 0.85);
        v.setRepairCost(50000.0);
        v.setImageUrl(img);
        v.setGalleryUrls(img);
        v.setStatus("AVAILABLE");
        return v;
    }
}