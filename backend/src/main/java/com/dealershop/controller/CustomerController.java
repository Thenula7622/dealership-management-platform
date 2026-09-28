package com.dealershop.controller;

import com.dealershop.entity.Customer;
import com.dealershop.entity.Vehicle;
import com.dealershop.entity.WishlistItem;
import com.dealershop.repository.CustomerRepository;
import com.dealershop.repository.VehicleRepository;
import com.dealershop.repository.WishlistRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "*")
public class CustomerController {

    private final CustomerRepository customerRepository;
    private final WishlistRepository wishlistRepository;
    private final VehicleRepository vehicleRepository;

    public CustomerController(CustomerRepository customerRepository,
                              WishlistRepository wishlistRepository,
                              VehicleRepository vehicleRepository) {
        this.customerRepository = customerRepository;
        this.wishlistRepository = wishlistRepository;
        this.vehicleRepository = vehicleRepository;
    }

    // Register Customer
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Customer customer) {
        if (customerRepository.findByEmail(customer.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email is already registered!"));
        }
        Customer saved = customerRepository.save(customer);
        return ResponseEntity.ok(saved);
    }

    // Customer Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> creds) {
        String email = creds.get("email");
        String password = creds.get("password");

        Optional<Customer> optional = customerRepository.findByEmail(email);
        if (optional.isPresent() && optional.get().getPassword().equals(password)) {
            return ResponseEntity.ok(optional.get());
        }
        return ResponseEntity.status(401).body(Map.of("error", "Invalid email or password"));
    }

    // Get Wishlist Vehicles for a Customer
    @GetMapping("/{customerId}/wishlist")
    public ResponseEntity<List<Vehicle>> getCustomerWishlist(@PathVariable Long customerId) {
        List<WishlistItem> items = wishlistRepository.findByCustomerId(customerId);
        List<Long> vehicleIds = items.stream().map(WishlistItem::getVehicleId).toList();
        List<Vehicle> vehicles = vehicleRepository.findAllById(vehicleIds);
        return ResponseEntity.ok(vehicles);
    }

    // Toggle Wishlist Item (Add or Remove)
    @PostMapping("/{customerId}/wishlist/{vehicleId}")
    public ResponseEntity<?> toggleWishlistItem(@PathVariable Long customerId, @PathVariable Long vehicleId) {
        Optional<WishlistItem> existing = wishlistRepository.findByCustomerIdAndVehicleId(customerId, vehicleId);
        if (existing.isPresent()) {
            wishlistRepository.delete(existing.get());
            return ResponseEntity.ok(Map.of("status", "REMOVED"));
        } else {
            WishlistItem item = new WishlistItem(customerId, vehicleId);
            wishlistRepository.save(item);
            return ResponseEntity.ok(Map.of("status", "ADDED"));
        }
    }
}