package com.ivanaga.commercelogistics.catalog.application;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import com.ivanaga.commercelogistics.catalog.application.exceptions.ProductAlreadyExistsException;
import com.ivanaga.commercelogistics.catalog.application.exceptions.ProductNotFoundException;
import com.ivanaga.commercelogistics.catalog.domain.Product;
import com.ivanaga.commercelogistics.catalog.infrastructure.ProductRepository;

public class ProductServiceTest 
{
    private ProductService productService;
    private ProductRepository productRepository;

    @BeforeEach 
    void setUp()
    {
        productRepository = Mockito.mock(ProductRepository.class);
        productService = new ProductService(productRepository);
    }

    @Test 
    void createProductSuccessTest()
    {
        Product product = new Product("Iphone 11-256", "Iphone 11 Black 256 GB", "Loh", new BigDecimal("200.00"));
        when(productRepository.findBySku(product.getSku())).thenReturn(Optional.empty());
        when(productRepository.save(Mockito.any(Product.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Product result = productService.createProduct("Iphone 11-256", "Iphone 11 Black 256 GB", "Loh", new BigDecimal("200.00"));

        assertEquals(product.getSku(), result.getSku());
        assertEquals(product.getName(), result.getName());
        assertEquals(product.getDescription(), result.getDescription());
        assertEquals(product.getPrice(), result.getPrice());
        assertEquals(product.getStatus(), result.getStatus());

        verify(productRepository).findBySku("Iphone 11-256");
        verify(productRepository).save(Mockito.any(Product.class));
    }

    @Test
    void dupliacteSkuTest()
    {
        Product existingProduct = new Product("Iphone 11-256", "Iphone 11 Black 256 GB", "Loh", new BigDecimal("200.00"));
        when(productRepository.findBySku(Mockito.anyString())).thenReturn(Optional.of(existingProduct));

        assertThrows(ProductAlreadyExistsException.class, () -> productService.createProduct("Iphone 11-256", "Iphone 11 Black 256 GB", "Loh", new BigDecimal("200.00")));

        verify(productRepository, never()).save(Mockito.any(Product.class));
    }

    @Test 
    void findByIdTestSuccess()
    {
        Product existingProduct = new Product("Iphone 11-256", "Iphone 11 Black 256 GB", "Loh", new BigDecimal("200.00"));
        Long id = 1L;
        when(productRepository.findById(id)).thenReturn(Optional.of(existingProduct));
        Product product = productService.getProductById(id);
        assertEquals(product, existingProduct);
        verify(productRepository).findById(id);
    }

    @Test 
    void findByIdTestNotFound()
    {
        when(productRepository.findById(999L)).thenReturn(Optional.empty());  
        assertThrows(ProductNotFoundException.class, () -> productService.getProductById(999L));
        verify(productRepository).findById(999L);
    }

    @Test 
    void getAllProducts()
    {
        when(productRepository.findAll()).thenReturn(List.of());
        List<Product> products = productService.getAllProducts();
        assertEquals(products, List.of());
        verify(productRepository).findAll();
    }

    @Test 
    void updateProductSuccess()
    {

        Product existingProduct = new Product("Iphone 11-256", "Iphone 11 Black 256 GB", "Loh", new BigDecimal("200.00"));
        when(productRepository.findById(1L)).thenReturn(Optional.of(existingProduct));
        when(productRepository.save(Mockito.any(Product.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Product updatedProduct = productService.updateProduct(1L, "Iphone 12-256", "Lohovskoy telefon", new BigDecimal("150.00"));
        assertEquals(updatedProduct.getName(), "Iphone 12-256");
        assertEquals(updatedProduct.getPrice(), new BigDecimal("150.00"));
        assertEquals(updatedProduct.getDescription(), "Lohovskoy telefon");

        verify(productRepository).findById(1L);
        verify(productRepository).save(existingProduct);
    }

    @Test 
    void updateProductNotFound()
    {
        when(productRepository.findById(999L)).thenReturn(Optional.empty());  
        assertThrows(ProductNotFoundException.class, () -> productService.updateProduct(999L, "s", "l", new BigDecimal("22")));
        verify(productRepository).findById(999L);
        verify(productRepository, never()).save(Mockito.any(Product.class));
    }
    
}
