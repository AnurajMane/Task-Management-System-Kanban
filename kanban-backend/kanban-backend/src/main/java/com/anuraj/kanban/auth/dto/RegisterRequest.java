package com.anuraj.kanban.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RegisterRequest {
	
	@NotBlank(message = "Name is Required")
	private String name;
	
	@Email(message = "Invalid Email, Please Check..!")
	@NotBlank(message = "Email is Required")
	private String email;
	
	@NotBlank(message = "Password is Required")
	private String password;
}
