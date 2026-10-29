package com.ivanaga.commercelogistics.catalog.application;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ivanaga.commercelogistics.catalog.application.exceptions.ProductAlreadyExistsException;
import com.ivanaga.commercelogistics.catalog.application.exceptions.ProductNotFoundException;
import com.ivanaga.commercelogistics.catalog.domain.Product;
import com.ivanaga.commercelogistics.catalog.infrastructure.ProductRepository;

@Service 
public class ProductService 
{

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository)
    {
        this.productRepository = productRepository;
    }


    public Product createProduct(String sku, String name, String description, BigDecimal price)
    {
        Optional<Product> productFromDb = productRepository.findBySku(sku);

        if (productFromDb.isPresent())
        {
            throw new ProductAlreadyExistsException(sku);
        }

        Product product = new Product(sku, name, description, price);
        return productRepository.save(product);
    }

    public Product getProductById(Long id)
    {
        return productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException(id));
    }

    public List<Product> getAllProducts()
    {
        return productRepository.findAll();
    }

    
}
