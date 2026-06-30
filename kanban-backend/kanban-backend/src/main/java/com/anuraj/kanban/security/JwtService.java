package com.anuraj.kanban.security;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
	
	private final Long expTime;
	private final SecretKey key;
	private String secret;
	
	public JwtService(
			@Value("${jwt.secret}") String secret, 
            @Value("${jwt.expiration}") Long expTime) {
		this.expTime = expTime;
		this.key = Keys.hmacShaKeyFor(secret.getBytes());
		this.secret = secret;
	}
	
	private SecretKey getSigningKey() {
		return Keys.hmacShaKeyFor(secret.getBytes());
	}
	
	public String generateToken(String email) {
		return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + expTime
                        )
                )
                .signWith(key)
                .compact();
	}
	
	public String extractEmail(String token) {
		Claims claims = Jwts.parser()
				.verifyWith(getSigningKey())
				.build()
				.parseSignedClaims(token)
				.getPayload();
		return claims.getSubject();
	}
	
	public boolean isTokenValid(String token) {
		try {
			Jwts.parser()
			.verifyWith(getSigningKey())
			.build()
			.parseSignedClaims(token);
			return true;
		}
		catch(Exception e) {
			return false;
		}
	}
}
