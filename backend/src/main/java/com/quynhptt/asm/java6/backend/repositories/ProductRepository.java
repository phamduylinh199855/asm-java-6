package com.quynhptt.asm.java6.backend.repositories;

import com.quynhptt.asm.java6.backend.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}

