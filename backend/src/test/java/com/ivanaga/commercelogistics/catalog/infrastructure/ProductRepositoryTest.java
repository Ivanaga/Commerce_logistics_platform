package com.ivanaga.commercelogistics.catalog.infrastructure;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.math.BigDecimal;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.postgresql.PostgreSQLContainer;

import com.ivanaga.commercelogistics.catalog.domain.Product;

import jakarta.persistence.EntityManager;

@DataJpaTest
@Testcontainers
class ProductRepositoryTest 
{
    @Container
    @ServiceConnection
    static PostgreSQLContainer postgres = new PostgreSQLContainer("postgres:16");

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private EntityManager entityManager;

    @Test
    void shouldSaveAndFindProductBySku() 
    {
        Product product = new Product("Iphone11-256", "Iphone11","Test", new BigDecimal("200.00"));
        productRepository.saveAndFlush(product);

        entityManager.clear();

        Optional<Product> result = productRepository.findBySku("Iphone11-256");
        assertTrue(result.isPresent());

        Product resultUnwrapped = result.get();

        assertEquals(product.getSku(), resultUnwrapped.getSku());
        assertEquals(product.getName(), resultUnwrapped.getName());
        assertEquals(product.getStatus(), resultUnwrapped.getStatus());
        assertEquals(product.getPrice(), resultUnwrapped.getPrice());
        assertEquals(product.getDescription(), resultUnwrapped.getDescription());
        assertEquals(product.getId(), resultUnwrapped.getId());

    }

    @Test 
    void shouldReturnEmptyOptionalIfSkuDoesntExist()
    {
        Optional<Product> result = productRepository.findBySku("NOTPRESENT");

        assertTrue(result.isEmpty());
    }
}