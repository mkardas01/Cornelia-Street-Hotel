package com.hotel.api.exception;

public class UserAlreadyExists extends RuntimeException{

    public UserAlreadyExists(String message) {
        super(message);
    }
}
