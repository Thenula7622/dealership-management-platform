package com.dealershop.repository;

import com.dealershop.entity.StaffMember;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface StaffMemberRepository extends JpaRepository<StaffMember, Long> {
    List<StaffMember> findAllByOrderByCreatedAtDesc();
    List<StaffMember> findByRole(String role);
    Optional<StaffMember> findByEmail(String email);
}