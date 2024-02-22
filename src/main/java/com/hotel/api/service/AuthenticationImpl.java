package com.hotel.api.service;

import com.hotel.api.dto.AuthenticationRequest;
import com.hotel.api.dto.AuthenticationRespond;
import com.hotel.api.dto.RegisterRequest;
import com.hotel.api.model.user.Role;
import com.hotel.api.model.user.User;
import com.hotel.api.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationImpl implements AuthenticationService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public AuthenticationRespond register(RegisterRequest request) {
        User user = User.builder()
                .name(request.getName())
                .surname(request.getSureName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        userRepository.save(user);

        String jwtToken = jwtService.generateToken(user);

        return AuthenticationRespond.builder().token(jwtToken).build();
    }

    @Override
    public AuthenticationRespond login(AuthenticationRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();

        String jwtToken = jwtService.generateToken(user);

        return AuthenticationRespond.builder().token(jwtToken).build();
    }
}
