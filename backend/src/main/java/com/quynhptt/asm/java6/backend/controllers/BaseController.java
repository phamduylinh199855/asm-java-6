package com.quynhptt.asm.java6.backend.controllers;

import com.quynhptt.asm.java6.backend.configs.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class BaseController {

    protected final JwtUtil jwtUtil;

    private final HttpServletRequest request;

    protected Long getUserId() {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            return jwtUtil.extractUserId(token);
        }
        throw new RuntimeException("Cannot parse userId from token");
    }
}
