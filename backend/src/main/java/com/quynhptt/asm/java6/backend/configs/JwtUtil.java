package com.quynhptt.asm.java6.backend.configs;

import com.quynhptt.asm.java6.backend.constants.enums.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Set;

@Component
public class JwtUtil {
    private static final String USER_ID = "userId";
    private static final String ROLES = "roles";
    private final SecretKey key = Keys.hmacShaKeyFor("my-super-secret-key-1234567890123456".getBytes()); // 256-bit key

    public String generateToken(Long userId, String username, Set<Role> roles) {
        return Jwts.builder()
                .subject(username)
                .claim(USER_ID, userId)
                .claim(ROLES, roles)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 hour
                .signWith(key, Jwts.SIG.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload().getSubject();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        return extractUsername(token).equals(userDetails.getUsername());
    }

    public Long extractUserId(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return claims.get(USER_ID, Long.class);
    }

}
