package com.ivanaga.commercelogistics.catalog.application.exceptions;

public class ProductAlreadyExistsException extends RuntimeException
{
    public ProductAlreadyExistsException(String sku)
    {
        super("Product with SKU '" + sku + "' already exists");
    }
}