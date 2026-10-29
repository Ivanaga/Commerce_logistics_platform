package com.ivanaga.commercelogistics.catalog.api.error;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ivanaga.commercelogistics.catalog.application.exceptions.ProductAlreadyExistsException;
import com.ivanaga.commercelogistics.catalog.application.exceptions.ProductNotFoundException;

@RestControllerAdvice 
public class GlobalExceptionHandler 
{

    @ExceptionHandler(ProductAlreadyExistsException.class)
    public ResponseEntity<String> handleProductAlreadyExists(ProductAlreadyExistsException exception)
    {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(exception.getMessage());
    }

    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<String> handleProductNotFoundById(ProductNotFoundException exception)
    {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
    }
    
}
