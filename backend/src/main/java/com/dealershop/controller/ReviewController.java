package com.dealershop.controller;

import com.dealershop.entity.Review;
import com.dealershop.repository.ReviewRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {

    private final ReviewRepository reviewRepository;

    public ReviewController(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    // 1. Get All Reviews (Newest first)
    @GetMapping
    public List<Review> getAllReviews() {
        return reviewRepository.findAllByOrderByCreatedAtDesc();
    }

    // 2. Create Review
    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody Review review) {
        Review saved = reviewRepository.save(review);
        return ResponseEntity.ok(saved);
    }

    // 3. Update Review (Admin Edit)
    @PutMapping("/{id}")
    public ResponseEntity<Review> updateReview(@PathVariable Long id, @RequestBody Review updated) {
        return reviewRepository.findById(id).map(rev -> {
            rev.setName(updated.getName());
            rev.setVehicle(updated.getVehicle());
            rev.setRating(updated.getRating());
            rev.setComment(updated.getComment());
            Review saved = reviewRepository.save(rev);
            return ResponseEntity.ok(saved);
        }).orElse(ResponseEntity.notFound().build());
    }

    // 4. Delete Review (Admin Delete)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReview(@PathVariable Long id) {
        if (reviewRepository.existsById(id)) {
            reviewRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}