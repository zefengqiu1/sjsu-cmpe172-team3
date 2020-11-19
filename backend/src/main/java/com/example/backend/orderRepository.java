package com.example.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.model.order;

@Repository
public interface orderRepository extends JpaRepository<order, Long>{

}
