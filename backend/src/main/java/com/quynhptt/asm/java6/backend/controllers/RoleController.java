package com.quynhptt.asm.java6.backend.controllers;

import com.quynhptt.asm.java6.backend.constants.enums.Role;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    @GetMapping
    public Role[] getAllRoles() {
        return Role.values();
    }
}
