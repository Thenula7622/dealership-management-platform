package com.dealershop.controller;

import com.dealershop.entity.Invoice;
import com.dealershop.repository.InvoiceRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Year;
import java.util.List;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class InvoiceController {

    private final InvoiceRepository repository;

    public InvoiceController(InvoiceRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Invoice> getAll() {
        return repository.findAllByOrderByCreatedAtDesc();
    }

    @PostMapping
    public ResponseEntity<Invoice> create(@RequestBody Invoice invoice) {
        if (invoice.getInvoiceNumber() == null || invoice.getInvoiceNumber().isBlank()) {
            invoice.setInvoiceNumber("INV-" + Year.now().getValue() + "-" + String.format("%04d", (repository.count() + 1)));
        }
        if (invoice.getTotalAmount() == null) {
            double sub = invoice.getSubTotal() != null ? invoice.getSubTotal() : 0.0;
            double disc = invoice.getDiscount() != null ? invoice.getDiscount() : 0.0;
            double tax = invoice.getTaxAmount() != null ? invoice.getTaxAmount() : 0.0;
            invoice.setTotalAmount(sub - disc + tax);
        }
        Invoice saved = repository.save(invoice);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}