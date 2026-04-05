package com.seven.hayoma.service;

import com.seven.hayoma.dto.DriverDTO;

import java.util.List;

public interface DriverService {
    List<DriverDTO> getAllDrivers();
    DriverDTO getDriverById(Long id);
    DriverDTO createDriver(DriverDTO driverDTO);
    DriverDTO updateDriver(Long id, DriverDTO driverDTO);
    void deleteDriver(Long id);
    DriverDTO toggleAvailability(Long id);
}
