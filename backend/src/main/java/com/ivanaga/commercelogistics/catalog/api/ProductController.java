package com.ivanaga.commercelogistics.catalog.api;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ivanaga.commercelogistics.catalog.application.ProductService;
import com.ivanaga.commercelogistics.catalog.domain.Product;

import jakarta.validation.Valid;

@RestController 
@RequestMapping("/api/products")
public class ProductController 
{
    private final ProductService productService;

    public ProductController(ProductService productService)
    {
        this.productService = productService;
    }

    @PostMapping 
    public ProductResponse createProduct(@Valid @RequestBody CreateProductRequest request)
    {
        Product product = productService.createProduct(request.sku(), request.name(), request.description(), request.price());
        ProductResponse response = new ProductResponse(product.getId(), product.getSku(), product.getName(), product.getDescription(), product.getPrice(), product.getStatus());
        return response;
    }

    @GetMapping("/{id}")
    public ProductResponse findById(@PathVariable Long id)
    {
        Product product = productService.getProductById(id);
        ProductResponse response = new ProductResponse(product.getId(), product.getSku(), product.getName(), product.getDescription(), product.getPrice(), product.getStatus());
        return response;
    }

    @GetMapping 
    public List<ProductResponse> findAll()
    {
        List<Product> products = productService.getAllProducts();
         return products.stream().map(product -> 
            new ProductResponse(product.getId(), product.getSku(), product.getName(), product.getDescription(), product.getPrice(), product.getStatus())).toList();
    }

    @PatchMapping("/{id}")
    public ProductResponse updateProduct(@PathVariable Long id, @Valid @RequestBody UpdateProductRequest request)
    {
        Product product = productService.updateProduct(id, request.name(), request.description(), request.price());
        ProductResponse response = new ProductResponse(product.getId(), product.getSku(), product.getName(), product.getDescription(), product.getPrice(), product.getStatus());
        return response;
    }

    @PatchMapping("/{id}/deactivate")
    public ProductResponse deactivateProduct(@PathVariable Long id)
    {
        Product product = productService.deactivateProduct(id);
        ProductResponse response = new ProductResponse(product.getId(), product.getSku(), product.getName(), product.getDescription(), product.getPrice(), product.getStatus());
        return response;
    }

    @PatchMapping("/{id}/activate")
    public ProductResponse activateProduct(@PathVariable Long id)
    {
        Product product = productService.activateProduct(id);
        ProductResponse response = new ProductResponse(product.getId(), product.getSku(), product.getName(), product.getDescription(), product.getPrice(), product.getStatus());
        return response;
    }
    
}