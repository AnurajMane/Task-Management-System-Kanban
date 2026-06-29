package com.anuraj.kanban.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
	
	@Email(message = "Invalid email")
	@NotBlank(message = "Email is Required")
	private String email;
	
	@NotBlank(message = "password is Required")
	private String password;
}
