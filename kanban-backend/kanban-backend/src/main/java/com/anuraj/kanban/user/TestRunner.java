package com.anuraj.kanban.user;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.anuraj.kanban.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class TestRunner implements CommandLineRunner{
	private final UserRepository userRepository;
	
	@Override
	public void run(String... args) {
		System.out.println(
				"Total Users = "
				+ userRepository.count()
		);
	}
}
