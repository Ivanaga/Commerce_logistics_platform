package com.ivanaga.commercelogistics.catalog.application.exceptions;

public class ProductNotFoundException extends RuntimeException
{
    public ProductNotFoundException(Long id)
    {
        super("Product with id '" + id + "' not found!");
    }
}
