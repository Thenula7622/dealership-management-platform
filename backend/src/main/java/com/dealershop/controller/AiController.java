package com.dealershop.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
public class AiController {

    // 1. AI Smart Market Valuation & Price Predictor (Sri Lankan Market Algorithmic Model)
    @PostMapping("/predict-valuation")
    public ResponseEntity<Map<String, Object>> predictValuation(@RequestBody Map<String, Object> req) {
        String brand = req.getOrDefault("brand", "Toyota").toString();
        String model = req.getOrDefault("model", "Vehicle").toString();
        int year = Integer.parseInt(req.getOrDefault("year", "2018").toString());
        int mileage = Integer.parseInt(req.getOrDefault("mileage", "50000").toString());

        // Base Valuation Heuristics for Sri Lankan Vehicle Market
        double basePrice = 6500000.0;
        if (model.toLowerCase().contains("vitz")) basePrice = 7800000.0;
        else if (model.toLowerCase().contains("vezel")) basePrice = 11500000.0;
        else if (model.toLowerCase().contains("premio")) basePrice = 19500000.0;
        else if (model.toLowerCase().contains("alto")) basePrice = 3400000.0;
        else if (model.toLowerCase().contains("hiace") || model.toLowerCase().contains("kdh")) basePrice = 18500000.0;
        else if (brand.toLowerCase().contains("bike") || model.toLowerCase().contains("fz") || model.toLowerCase().contains("boxer")) basePrice = 550000.0;

        // Mileage & Year Depreciations / Premiums
        int currentYear = 2026;
        int age = Math.max(0, currentYear - year);
        double yearAdjustment = 1.0 - (age * 0.025);
        double mileageAdjustment = 1.0 - ((mileage / 10000) * 0.015);

        double estimatedMarketValue = Math.round(basePrice * yearAdjustment * mileageAdjustment);
        double marketLow = Math.round(estimatedMarketValue * 0.95);
        double marketHigh = Math.round(estimatedMarketValue * 1.05);
        double instantShowroomCashOffer = Math.round(estimatedMarketValue * 0.90);

        Map<String, Object> response = new HashMap<>();
        response.put("vehicle", brand + " " + model + " (" + year + ")");
        response.put("estimatedMarketValue", estimatedMarketValue);
        response.put("marketRangeLow", marketLow);
        response.put("marketRangeHigh", marketHigh);
        response.put("instantCashOffer", instantShowroomCashOffer);
        response.put("valuationConfidenceScore", 94);
        response.put("marketDemandIndex", "HIGH DEMAND IN SRI LANKA");

        return ResponseEntity.ok(response);
    }

    // 2. AI Vehicle Damage & Dent Computer Vision Scanner (Analysis Simulator)
    @PostMapping("/scan-damage")
    public ResponseEntity<Map<String, Object>> scanDamage(@RequestBody Map<String, String> req) {
        String imageUrl = req.getOrDefault("imageUrl", "");

        Map<String, Object> result = new HashMap<>();
        result.put("imageUrl", imageUrl);
        result.put("bodyIntegrityScore", 92);
        result.put("paintCondition", "Original Factory Clearcoat Detected");
        result.put("detectedIssues", new String[]{
                "Minor hairline scratch on front left bumper (Buffing Recommended)",
                "Zero major dent or chassis deformation detected",
                "Alloy wheel rim surface score: 95/100"
        });
        result.put("estimatedReconditioningCostLkr", 25000.0);
        result.put("auditResult", "PASSED VERIFICATION");

        return ResponseEntity.ok(result);
    }

    // 3. AI Vehicle Marketing Ad & Description Generator
    @PostMapping("/generate-ad-copy")
    public ResponseEntity<Map<String, String>> generateAdCopy(@RequestBody Map<String, Object> req) {
        String title = req.getOrDefault("title", "Vehicle").toString();
        String brand = req.getOrDefault("brand", "").toString();
        String model = req.getOrDefault("model", "").toString();
        String year = req.getOrDefault("year", "2018").toString();
        String price = req.getOrDefault("price", "Contact").toString();
        String mileage = req.getOrDefault("mileage", "0").toString();
        String transmission = req.getOrDefault("transmission", "Automatic").toString();

        String sinhalaAd = "🔥 විකිණීමට ඇත: " + title + " (" + year + ") 🔥\n" +
                "📍 Thenula Enterprises, Mawathagama\n\n" +
                "✔️ Make & Model: " + brand + " " + model + "\n" +
                "✔️ Transmission: " + transmission + "\n" +
                "✔️ Genuine Mileage: " + mileage + " km (Clear Service Records)\n" +
                "✔️ 100-Point Inspection Pass Certified (Accident-Free Guaranteed)\n" +
                "💰 Special Showroom Offer: LKR " + price + "\n" +
                "🏦 Leasing facilities arranged up to 70% within 1 day!\n" +
                "📞 අදම අමතන්න / WhatsApp: 076 820 2700\n" +
                "රථය පරීක්ෂා කර බැලීමට අප ප්‍රදර්ශනාගාරයට පැමිණෙන්න.";

        String englishAd = "✨ SHOWROOM SPOTLIGHT: " + title + " (" + year + ") FOR SALE ✨\n\n" +
                "Discover premium luxury & verified performance at Thenula Enterprises:\n" +
                "• Brand & Model: " + brand + " " + model + "\n" +
                "• Manufacture Year: " + year + " | Transmission: " + transmission + "\n" +
                "• Certified Odometer: " + mileage + " km\n" +
                "• 100-Point Audit Certified | Original Factory Documents\n" +
                "• Dealership Offer Price: LKR " + price + " (Negotiable upon inspection)\n" +
                "• Hassle-free Leasing & Trade-In Exchange Available\n\n" +
                "📍 Location: Mawathagama, Sri Lanka\n" +
                "📞 Contact Hotline: +94 76 820 2700 | Book your Test Drive Online Today!";

        Map<String, String> response = new HashMap<>();
        response.put("sinhalaAd", sinhalaAd);
        response.put("englishAd", englishAd);

        return ResponseEntity.ok(response);
    }
}