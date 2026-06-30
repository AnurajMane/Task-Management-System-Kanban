package com.anuraj.kanban.auth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anuraj.kanban.auth.dto.AuthResponse;
import com.anuraj.kanban.auth.dto.LoginRequest;
import com.anuraj.kanban.auth.dto.RegisterRequest;
import com.anuraj.kanban.auth.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;
	
	@PostMapping("/register")
	public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest request){
		authService.register(request);
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body("User registered successfully..!");
	}
	
	@PostMapping("/login")
	public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request){
		AuthResponse response = authService.login(request);
		return ResponseEntity.ok(response);
	}
}
