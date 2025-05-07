package com.seven.hayoma.service;

import com.seven.hayoma.dto.DriverDTO;
import com.seven.hayoma.model.Driver;
import com.seven.hayoma.repository.DriverRepository;
import com.seven.hayoma.service.DriverService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DriverServiceImpl implements DriverService {

    private final DriverRepository driverRepository;

    @Override
    public List<DriverDTO> getAllDrivers() {
        return driverRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public DriverDTO getDriverById(Long id) {
        return toDTO(driverRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Driver not found")));
    }

    @Override
    public DriverDTO createDriver(DriverDTO dto) {
        Driver driver = toEntity(dto);
        return toDTO(driverRepository.save(driver));
    }

    @Override
    public DriverDTO updateDriver(Long id, DriverDTO dto) {
        Driver driver = driverRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        driver.setName(dto.getName());
        driver.setPhone(dto.getPhone());
        driver.setAvailable(dto.isAvailable());

        return toDTO(driverRepository.save(driver));
    }

    @Override
    public void deleteDriver(Long id) {
        driverRepository.deleteById(id);
    }

    @Override
    public DriverDTO toggleAvailability(Long id) {
        Driver driver = driverRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        driver.setAvailable(!driver.isAvailable());
        return toDTO(driverRepository.save(driver));
    }

    // DTO to Entity
    private Driver toEntity(DriverDTO dto) {
        return Driver.builder()
                .id(dto.getId())
                .name(dto.getName())
                .phone(dto.getPhone())
                .available(dto.isAvailable())
                .build();
    }

    // Entity to DTO
    private DriverDTO toDTO(Driver driver) {
        return DriverDTO.builder()
                .id(driver.getId())
                .name(driver.getName())
                .phone(driver.getPhone())
                .available(driver.isAvailable())
                .build();
    }
}
