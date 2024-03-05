package com.hotel.api.service.Authentication;

import com.hotel.api.dto.AuthenticationRequest;
import com.hotel.api.dto.AuthenticationRespond;
import com.hotel.api.dto.RegisterRequest;
import com.hotel.api.exception.*;
import com.hotel.api.model.user.Role;
import com.hotel.api.model.user.User;
import com.hotel.api.repository.UserRepository;
import com.hotel.api.service.Jwt.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.yaml.snakeyaml.constructor.DuplicateKeyException;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthenticationImpl implements AuthenticationService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    private AuthenticationRespond getAuthenticationRespond(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("name", user.getName());
        claims.put("surname", user.getSurname());

        String jwtToken = jwtService.generateToken(claims, user);

        return AuthenticationRespond.builder().token(jwtToken).build();
    }

    @Override
    public AuthenticationRespond register(RegisterRequest request) {
        User user = User.builder()
                .name(request.getName())
                .surname(request.getSurname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        try {
            userRepository.save(user);
        } catch (Exception e) {
            if(e.toString().contains("Duplicate"))
                throw new UserAlreadyExists("Użytkownik o podanym adresie e-mail już istnieje");
            else
                throw new UserError("Użytkownik o podanym adresie e-mail już istnieje");
        }

        return getAuthenticationRespond(user);
    }



    @Override
    public AuthenticationRespond login(AuthenticationRequest request) {

        UsernamePasswordAuthenticationToken userAuth =
                new UsernamePasswordAuthenticationToken(
                    request.getEmail(), request.getPassword());

        try {

            authenticationManager.authenticate(userAuth);

        } catch (AuthenticationException e) {

            throw new UserNotFoundException("Podano nieprawidłowe dane");
        }

        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();

        return getAuthenticationRespond(user);
    }
}
