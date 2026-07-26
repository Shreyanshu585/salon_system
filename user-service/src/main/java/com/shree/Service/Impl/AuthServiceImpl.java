package com.shree.Service.Impl;

import com.shree.Model.User;
import com.shree.Payload.Response.AuthResponse;
import com.shree.Payload.Response.DTO.SignupDTO;
import com.shree.Payload.Response.DTO.TokenResponse;
import com.shree.Repository.UserRepository;
import com.shree.Service.AuthService;
import com.shree.Service.KeycloakService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final KeycloakService keycloakService;

    @Override
    public AuthResponse login(String username, String password) throws Exception {

        TokenResponse tokenResponse = keycloakService.getAdminAccessToken(username,password,"password",null);
        AuthResponse authResponse= new AuthResponse();
        authResponse.setRefresh_token((tokenResponse.getRefreshToken()));
        authResponse.setJwt(tokenResponse.getAccessToken());
        authResponse.setMessage("login success");
        return authResponse;
    }

    @Override
    public AuthResponse signup(SignupDTO req) throws Exception {
        KeycloakService.createUser(req);

        User user = new User();
        user.setUsername(req.getUsername());
        user.setPassword(req.getPassword());
        user.setEmail(req.getEmail());
        user.setRole(req.getRole());
        user.setFullName(req.getFullName());
        user.setCreatedAt(LocalDateTime.now());

        userRepository.save(user);

        TokenResponse tokenResponse = keycloakService.getAdminAccessToken(req.getUsername(),req.getPassword(),"password",null);
        AuthResponse authResponse= new AuthResponse();
        authResponse.setRefresh_token((tokenResponse.getRefreshToken()));
        authResponse.setJwt(tokenResponse.getAccessToken());
        authResponse.setRole(user.getRole());
        authResponse.setMessage("Register success");



        return authResponse;
    }

    @Override
    public AuthResponse getAccessTokenFromRefreshToken(String refreshToken) throws Exception {
        TokenResponse tokenResponse = keycloakService.getAdminAccessToken(null,null,"refresh_token",refreshToken);
        AuthResponse authResponse= new AuthResponse();
        authResponse.setRefresh_token((tokenResponse.getRefreshToken()));
        authResponse.setJwt(tokenResponse.getAccessToken());
        authResponse.setMessage("login success");
        return authResponse;

    }
}
