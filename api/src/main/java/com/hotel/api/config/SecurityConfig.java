package com.hotel.api.config;

import com.hotel.api.exception.GlobalExceptionHandler;
import com.hotel.api.exception.UserError;
import com.hotel.api.model.user.User;
import jakarta.servlet.Filter;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JWTAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.authorizeRequests(
                        authorizeRequests ->
                        {
                            try {

                                authorizeRequests.requestMatchers("api/auth/**", "/api/reservation/reserve/**", "/api/room/find")
                                        .permitAll()
                                        .requestMatchers("api/admin/**")
                                        .hasAuthority("ADMIN")
                                        .anyRequest()
                                        .authenticated()
                                        .and()
                                        .sessionManagement(
                                                sessionManagment ->
                                                        sessionManagment.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                                        )
                                        .authenticationProvider(authenticationProvider)
                                        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
                            } catch (Exception e) {
                                throw new RuntimeException(e);
                            }
                        }

                )
                .csrf(AbstractHttpConfigurer::disable);


        return http.build();
    }


}
