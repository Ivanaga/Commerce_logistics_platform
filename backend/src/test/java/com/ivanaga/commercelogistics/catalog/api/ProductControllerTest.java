package com.ivanaga.commercelogistics.catalog.api;

import org.hibernate.sql.Update;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import com.ivanaga.commercelogistics.catalog.application.ProductService;
import com.ivanaga.commercelogistics.catalog.application.exceptions.ProductAlreadyExistsException;
import com.ivanaga.commercelogistics.catalog.application.exceptions.ProductNotFoundException;
import com.ivanaga.commercelogistics.catalog.domain.Product;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import java.math.BigDecimal;
import java.util.List;

import tools.jackson.databind.ObjectMapper;

@WebMvcTest(ProductController.class) 
public class ProductControllerTest 
{

    @Autowired 
    private ObjectMapper objectMapper;

    @Autowired  
    private MockMvc mockMvc;

    @MockitoBean 
    private ProductService productService;

    @Test 
    void createProductSuccess() throws Exception
    {
        
        Product product = new Product("Iphone 11-256", "Iphone 11 Black 256 GB", "Loh", new BigDecimal("200.00"));
        CreateProductRequest request = new CreateProductRequest("Iphone 11-256", "Iphone 11 Black 256 GB", "Loh", new BigDecimal("200.00"));

        when(productService.createProduct(request.sku(), request.name(), request.description(), request.price())).thenReturn(product);
        mockMvc.perform(post("/api/products").contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(request))).andExpect(status().isOk())
        .andExpect(jsonPath("$.sku").value("Iphone 11-256"))
        .andExpect(jsonPath("$.name").value("Iphone 11 Black 256 GB"))
        .andExpect(jsonPath("$.description").value("Loh"))
        .andExpect(jsonPath("$.price").value(200.00))
        .andExpect(jsonPath("$.status").value("ACTIVE"));
    
    }

    @Test 
    void createProductDoubleSku() throws Exception
    {
        CreateProductRequest request = new CreateProductRequest("Iphone 11-256", "Iphone 11 Black 256 GB", "Loh", new BigDecimal("200.00"));

        when(productService.createProduct(request.sku(), request.name(), request.description(), request.price())).thenThrow(new ProductAlreadyExistsException(request.sku())); 
        mockMvc.perform(post("/api/products").contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(request))).andExpect(status().isConflict());
    }

    @Test 
    void createProductBlankSku() throws Exception
    {
        CreateProductRequest request = new CreateProductRequest("", "Iphone 11 Black 256 GB", "Loh", new BigDecimal("200.00"));
        mockMvc.perform(post("/api/products").contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(request))).andExpect(status().isBadRequest());
        verify(productService, never()).createProduct(anyString(), anyString(), anyString(), any(BigDecimal.class));
    }
    @Test 
    void findByIdSuccess() throws Exception
    {
        Product product = new Product("Iphone 11-256", "Iphone 11 Black 256 GB", "Loh", new BigDecimal("200.00"));
        when(productService.getProductById(1L)).thenReturn(product);
        mockMvc.perform(get("/api/products/1")).andExpect(status().isOk()).andExpect(jsonPath("$.sku").value("Iphone 11-256"))
        .andExpect(jsonPath("$.name").value("Iphone 11 Black 256 GB"))
        .andExpect(jsonPath("$.description").value("Loh"))
        .andExpect(jsonPath("$.price").value(200.00))
        .andExpect(jsonPath("$.status").value("ACTIVE"));
    }

    @Test 
    void findByIdNotFound() throws Exception
    {
        when(productService.getProductById(999L)).thenThrow(new ProductNotFoundException(999L));
        mockMvc.perform(get("/api/products/999")).andExpect(status().isNotFound()).andExpect(content().string("Product with id '999' not found!"));
    }
    @Test 
    void findAll() throws Exception
    {
        Product product_1 = new Product("Iphone 11-256", "Iphone 11 Black 256 GB", "Loh", new BigDecimal("200.00"));
        Product product_2 = new Product("Iphone 12-256", "Iphone 12 Black 256 GB", "Lo2", new BigDecimal("300.00"));
        when(productService.getAllProducts()).thenReturn(List.of(product_1, product_2));
        mockMvc.perform(get("/api/products")).andExpect(status().isOk()).andExpect(jsonPath("$[0].sku").value("Iphone 11-256")).andExpect(jsonPath("$[1].sku").value("Iphone 12-256"));
    }

    @Test 
    void updateProductSuccess() throws Exception
    {
        UpdateProductRequest updateRequest = new UpdateProductRequest("jopa", "jopa pukaet kalom", new BigDecimal("200.00"));
        Product product_1 = new Product("Iphone 11-256", "jopa", "jopa pukaet kalom", new BigDecimal("200.00"));
        when(productService.updateProduct(1L, "jopa", "jopa pukaet kalom", new BigDecimal("200.00"))).thenReturn(product_1);
        mockMvc.perform(patch("/api/products/1").contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(updateRequest))).andExpect(status().isOk()).andExpect(jsonPath("$.sku").value("Iphone 11-256"))
        .andExpect(jsonPath("$.name").value("jopa"))
        .andExpect(jsonPath("$.description").value("jopa pukaet kalom"))
        .andExpect(jsonPath("$.price").value(200.00))
        .andExpect(jsonPath("$.status").value("ACTIVE"));
    }

    @Test 
    void updateProductNotFound() throws Exception
    {
        UpdateProductRequest updateRequest = new UpdateProductRequest("jopa", "jopa pukaet kalom", new BigDecimal("200.00"));
        when(productService.updateProduct(999L, "jopa", "jopa pukaet kalom", new BigDecimal("200.00"))).thenThrow(new ProductNotFoundException(999L));
        mockMvc.perform(patch("/api/products/999").contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(updateRequest))).andExpect(status().isNotFound());
    }

    @Test
    void updateProductInvalidRequest() throws Exception
    {
        UpdateProductRequest updateRequest = new UpdateProductRequest("", "description", new BigDecimal("200.00"));

        mockMvc.perform(patch("/api/products/1").contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(updateRequest))).andExpect(status().isBadRequest());

        verify(productService, never()).updateProduct(Mockito.anyLong(), Mockito.anyString(), Mockito.anyString(), Mockito.any(BigDecimal.class));
    }
}
