package com.mardonio.backend;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.mardonio.backend.domain.Cliente;
import com.mardonio.backend.domain.Endereco;
import com.mardonio.backend.domain.Usuario;
import com.mardonio.backend.domain.enums.Perfil;
import com.mardonio.backend.repositories.ClienteRepository;
import com.mardonio.backend.repositories.EnderecoRepository;
import com.mardonio.backend.repositories.UsuarioRepository;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {
	
	@Autowired
	private ClienteRepository clienteRepository;
	
	@Autowired
	private EnderecoRepository endRepository;
	
	@Autowired
	private UsuarioRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder pe;

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
	
	@Override
	public void run(String... args) throws Exception {
		
		
		
		Cliente c1 = new Cliente(null, "Maria", "22233322233");
		Cliente c2 = new Cliente(null, "João", "22233344455");
		
		Endereco e1 = new Endereco(null, "Rua Flores", "300", "Apto 303", "Jardim", "38220834", "Brasilia", "DF", c1);
		Endereco e2 = new Endereco(null, "Avenida Matos", "105", "sala 800", "centro", "38777012", "Brasilia", "DF", c2);
		
		c1.getTelefones().addAll(Arrays.asList("6122223333","6198887777"));
		c2.getTelefones().addAll(Arrays.asList("6122223333","6198887777"));

		c1.getEmails().addAll(Arrays.asList("email1@gmail.com","email2@hotmail.com","email3@empresa.com"));
		c2.getEmails().addAll(Arrays.asList("email1@gmail.com","email2@hotmail.com","email3@empresa.com"));
		
		c1.getEnderecos().addAll(Arrays.asList(e1));
		c2.getEnderecos().addAll(Arrays.asList(e2));

		clienteRepository.saveAll(Arrays.asList(c1, c2));
		endRepository.saveAll(Arrays.asList(e1, e2));
		
		Usuario admin = new Usuario(null, "admin", pe.encode("123456"));
		Usuario comum = new Usuario(null, "comum", pe.encode("123456"));
		
		admin.addPerfil(Perfil.ADMIN);
		comum.addPerfil(Perfil.COMUM);

		userRepository.saveAll(Arrays.asList(admin, comum));

	}

}
