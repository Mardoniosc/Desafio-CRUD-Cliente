package com.mardonio.backend;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.mardonio.backend.domain.Cliente;
import com.mardonio.backend.repositories.ClienteRepository;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {
	
	@Autowired
	private ClienteRepository clienteRepository;

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
	
	@Override
	public void run(String... args) throws Exception {

		Cliente c1 = new Cliente(null, "Maria", "22233322233");
		Cliente c2 = new Cliente(null, "João", "22233344455");

		clienteRepository.saveAll(Arrays.asList(c1, c2));

	}

}
