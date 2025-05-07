package com.seven.hayoma.repository;

import com.seven.hayoma.model.SupplyRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplyRequestRepository extends JpaRepository<SupplyRequest, Long> {
}