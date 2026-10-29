package com.ivanaga.commercelogistics.catalog.api;

import java.math.BigDecimal;

import com.ivanaga.commercelogistics.catalog.domain.ProductStatus;

public record ProductResponse(Long id, String sku, String name, String description, BigDecimal price, ProductStatus status) {
    
}
