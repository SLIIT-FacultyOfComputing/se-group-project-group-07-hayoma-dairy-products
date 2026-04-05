package com.seven.hayoma.dto;

import lombok.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DriverDTO {
    private Long id;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String licenseNumber;
    private String address;
    private String vehicleType;
    private String vehicleNumber;
    private boolean available;
}
