package com.ivanaga.commercelogistics.catalog.infrastructure;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ivanaga.commercelogistics.catalog.domain.Product;

public interface ProductRepository extends JpaRepository<Product, Long>
{
    Optional<Product> findBySku(String sku);
}
