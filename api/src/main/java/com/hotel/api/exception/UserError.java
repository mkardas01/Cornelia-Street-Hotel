package com.hotel.api.exception;

public class UserError extends RuntimeException{
    public UserError(String message) {
        super(message);
    }
}
