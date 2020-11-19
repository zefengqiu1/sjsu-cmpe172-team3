package com.example.backend;


import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.example.backend.model.User;

@Repository
public interface userRepository extends JpaRepository<User, Long>{
}
