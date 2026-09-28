package com.dealershop.service;

import com.dealershop.entity.Inquiry;
import com.dealershop.entity.Vehicle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Value("${spring.mail.username:}")
    private String senderEmail;

    public void sendLeadNotification(Inquiry inquiry, Vehicle vehicle, String dealershipEmail) {
        // Dealer email එක ඇත්ත domain එකක් නොවෙයි නම් (උදා: .lk domain නොමැති නම්) senderEmail එකටම යැවීම
        String recipient = senderEmail;
        if (dealershipEmail != null && dealershipEmail.contains("@") && !dealershipEmail.endsWith(".lk")) {
            recipient = dealershipEmail;
        }

        String vehicleTitle = (vehicle != null) ? vehicle.getTitle() : "Unspecified Vehicle";
        String appointmentTime = (inquiry.getAppointmentDate() != null && !inquiry.getAppointmentDate().isBlank())
                ? inquiry.getAppointmentDate()
                : "Not Specified";

        String subject = "🚨 New Appointment: " + inquiry.getInquiryType() + " - " + inquiry.getCustomerName();

        // Email Body with full customer details
        String body = "You have received a new customer booking on your dealership showroom!\n\n"
                + "CUSTOMER & BOOKING DETAILS:\n"
                + "--------------------------------------------\n"
                + "• Customer Name: " + inquiry.getCustomerName() + "\n"
                + "• Contact Number: " + inquiry.getPhoneNumber() + "\n"
                + "• Booking Type: " + inquiry.getInquiryType() + "\n"
                + "• Vehicle: " + vehicleTitle + "\n"
                + "• Appointment Date & Time: " + appointmentTime + "\n"
                + "• Customer Message: " + (inquiry.getMessage() != null ? inquiry.getMessage() : "None") + "\n"
                + "--------------------------------------------\n\n"
                + "Action Required: Please call or WhatsApp the customer to confirm their time slot.";

        if (mailSender == null) {
            System.err.println("⚠️ [EMAIL ERROR]: JavaMailSender is NULL!");
            return;
        }

        try {
            System.out.println("⏳ Sending appointment alert to " + recipient + "...");
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(senderEmail);
            message.setTo(recipient);
            message.setSubject(subject);
            message.setText(body);

            mailSender.send(message);
            System.out.println("✅ [EMAIL SUCCESS]: Appointment alert delivered to " + recipient);
        } catch (Exception ex) {
            System.err.println("❌ [EMAIL FAILED]: " + ex.getMessage());
        }
    }
}