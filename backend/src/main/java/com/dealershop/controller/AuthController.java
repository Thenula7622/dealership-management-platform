package com.dealershop.controller;

import com.dealershop.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final JwtUtil jwtUtil;

    // Admin Credentials (පසුව database එකට මාරු කළ හැක)
    private final String ADMIN_USERNAME = "admin";
    private final String ADMIN_PASSWORD = "password123";

    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        if (ADMIN_USERNAME.equals(username) && ADMIN_PASSWORD.equals(password)) {
            String token = jwtUtil.generateToken(username);
            return ResponseEntity.ok(Map.of(
                "token", token,
                "username", username,
                "role", "ADMIN"
            ));
        }

        return ResponseEntity.status(401).body(Collections.singletonMap("error", "Invalid username or password"));
    }
}