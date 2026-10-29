package com.ivanaga.commercelogistics.catalog.api;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record UpdateProductRequest(@NotBlank String name, String description, @NotNull @PositiveOrZero BigDecimal price) 
{
} 
