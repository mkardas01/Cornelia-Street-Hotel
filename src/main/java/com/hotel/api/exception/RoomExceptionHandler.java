package com.hotel.api.exception;

public class RoomExceptionHandler extends RuntimeException{

    public RoomExceptionHandler(String message) {
        super(message);
    }

    public RoomExceptionHandler(String message, Throwable cause) {
        super(message, cause);
    }


}
