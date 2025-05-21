package com.seven.hayoma.service;

import com.seven.hayoma.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAllUsers();
    Optional<User> getUserById(Long id);
    void deleteUser(Long id);
    User updateUser(Long id, User updatedUser);
}
