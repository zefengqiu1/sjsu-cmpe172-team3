package com.example.backend;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.example.backend.model.product;

@Repository
public interface productRepository extends JpaRepository<product, Long> {
}
