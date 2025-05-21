package com.seven.hayoma.dto;


import com.seven.hayoma.model.User.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserExistsRequest {

        private Long id;
        private String username;
        private Role role;

}
