package com.anuraj.kanban.auth.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.anuraj.kanban.auth.dto.AuthResponse;
import com.anuraj.kanban.auth.dto.LoginRequest;
import com.anuraj.kanban.auth.dto.RegisterRequest;
import com.anuraj.kanban.security.JwtService;
import com.anuraj.kanban.user.entity.User;
import com.anuraj.kanban.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	
	public void register(RegisterRequest request) {
		if(userRepository.existsByEmail(request.getEmail())) {
			throw new RuntimeException("Email already exists");
		}
		User user = User.builder()
				.name(request.getName())
				.email(request.getEmail())
				.password(passwordEncoder.encode(request.getPassword()))
				.build();
		userRepository.save(user);
	}
	
	public AuthResponse login(LoginRequest request) {
		User user = userRepository
				.findByEmail(request.getEmail())
				.orElseThrow(() -> new RuntimeException("Invalid Email or password"));
		
		boolean matches = passwordEncoder.matches(
				request.getPassword(),
				user.getPassword()
		);
		if(!matches) {
			throw new RuntimeException("Invalid Email or Password..!");
		}
		
		String token = jwtService.generateToken(user.getEmail());
		return new AuthResponse(token);
	}
}
