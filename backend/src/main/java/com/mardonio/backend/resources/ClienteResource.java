package com.mardonio.backend.resources;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mardonio.backend.domain.Cliente;

@RestController
@RequestMapping(value = "/clientes")
public class ClienteResource {
	
	@GetMapping()
	public List<Cliente> listar() {
		Cliente c1 = new Cliente(1, "Maria", "11122233344");
		Cliente c2 = new Cliente(2, "Joao", "99988877766");
		
		List<Cliente> lista = new ArrayList<>();
		
		lista.add(c1);
		lista.add(c2);
		
		return lista;
	}

}
