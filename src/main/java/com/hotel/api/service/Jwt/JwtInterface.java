package com.hotel.api.service.Jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

public interface JwtInterface {

    public String extractUserName(String token);

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver);

    public boolean isTokenValid(String token, UserDetails userDetails);

    public String generateToken(UserDetails userDetails);

    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails);


}
