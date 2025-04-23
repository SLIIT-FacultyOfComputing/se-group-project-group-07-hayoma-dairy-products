package com.seven.hayoma.repository;

import com.seven.hayoma.model.SupplyHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplyHistoryRepository extends JpaRepository<SupplyHistory, Long> {
}