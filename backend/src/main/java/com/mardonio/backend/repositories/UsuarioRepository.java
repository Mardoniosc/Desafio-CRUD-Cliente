package com.mardonio.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mardonio.backend.domain.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer>{

}
