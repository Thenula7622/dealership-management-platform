package com.dealershop.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/uploads")
@CrossOrigin(origins = "*")
public class FileUploadController {

    private final String UPLOAD_DIR = "uploads/";

    public FileUploadController() {
        File dir = new File(UPLOAD_DIR);
        if (!dir.exists()) {
            dir.mkdirs();
        }
    }

    // Single or Multiple File Upload
    @PostMapping("/multiple")
    public ResponseEntity<List<String>> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
        List<String> uploadedUrls = new ArrayList<>();

        for (MultipartFile file : files) {
            if (file.isEmpty()) continue;

            try {
                String originalFilename = file.getOriginalFilename();
                String extension = "";
                if (originalFilename != null && originalFilename.contains(".")) {
                    extension = originalFilename.substring(originalFilename.lastIndexOf("."));
                }
                String newFileName = UUID.randomUUID().toString() + extension;
                Path targetLocation = Paths.get(UPLOAD_DIR).resolve(newFileName);
                Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

                String fileUrl = "http://localhost:8080/uploads/" + newFileName;
                uploadedUrls.add(fileUrl);
            } catch (IOException e) {
                System.err.println("Upload failed: " + e.getMessage());
            }
        }

        return ResponseEntity.ok(uploadedUrls);
    }
}