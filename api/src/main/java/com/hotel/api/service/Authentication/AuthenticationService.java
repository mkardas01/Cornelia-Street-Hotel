package com.hotel.api.service.Authentication;

import com.hotel.api.dto.AuthenticationRequest;
import com.hotel.api.dto.AuthenticationRespond;
import com.hotel.api.dto.RegisterRequest;

public interface AuthenticationService {

    public AuthenticationRespond register(RegisterRequest request);

    public AuthenticationRespond login(AuthenticationRequest request);


}
