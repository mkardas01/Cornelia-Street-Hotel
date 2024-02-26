package com.hotel.api.config;

import jakarta.servlet.Filter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

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

                        authorizeRequests.requestMatchers("api/auth/**", "/api/reservation/reserve/**" ,"/api/room/find")
                                .permitAll()
                                .anyRequest()
                                .authenticated()
                                .and()
                                .sessionManagement(
                                        sessionManagment->
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
