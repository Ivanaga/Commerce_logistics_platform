package com.ivanaga.commercelogistics.catalog.domain;

import java.math.BigDecimal;

import jakarta.persistence.*;

@Entity 
@Table(name = "products")
public class Product 
{
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String sku;

    @Column(nullable = false)
    private String name;

    @Column(nullable = true)
    private String description;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProductStatus status;

    protected Product() 
    {
    }
    public Product(String sku, String name, String description, BigDecimal price) 
    {
        this.sku = sku;
        this.name = name;
        this.description = description;
        this.price = price;
        this.status = ProductStatus.ACTIVE;
    }
    public Long getId() 
    {
        return id;
    }
    public String getSku() 
    {
        return sku;
    }
    public String getName() 
    {
        return name;
    }
    public String getDescription() 
    {
        return description;
    }
    public BigDecimal getPrice() 
    {
        return price;
    }
    public ProductStatus getStatus() 
    {
        return status;
    }
}
