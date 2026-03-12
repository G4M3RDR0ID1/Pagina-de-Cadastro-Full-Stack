package br.com.criandoapi.projeto.controller;

import br.com.criandoapi.projeto.dto.UsuarioDTO;
import br.com.criandoapi.projeto.dto.UsuarioResponseDTO;
import br.com.criandoapi.projeto.model.Usuario;
import br.com.criandoapi.projeto.security.Token;
import br.com.criandoapi.projeto.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/usuarios")
public class UsuarioController {

    private UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    //Metodo Get
    @GetMapping
    public ResponseEntity<List<UsuarioResponseDTO>> listaUsuarios() {
        return ResponseEntity.ok(usuarioService.listarUsuarios());
    }


    //Metodo Post
    @PostMapping
    public ResponseEntity<UsuarioResponseDTO> criarUsuario(@Valid @RequestBody Usuario usuario) {

        Usuario user = usuarioService.criarUsuario(usuario);

        UsuarioResponseDTO dto = new UsuarioResponseDTO();
        dto.setId(user.getId());
        dto.setNome(user.getNome());
        dto.setEmail(user.getEmail());
        dto.setTelefone(user.getTelefone());

        return ResponseEntity.status(201).body(dto);
    }

    //Metodo Update
    @PutMapping
    public ResponseEntity<UsuarioResponseDTO> editarUsuario(@Valid @RequestBody Usuario usuario) {

        Usuario user = usuarioService.editarUsuario(usuario);

        UsuarioResponseDTO dto = new UsuarioResponseDTO();
        dto.setId(user.getId());
        dto.setNome(user.getNome());
        dto.setEmail(user.getEmail());
        dto.setTelefone(user.getTelefone());

        return ResponseEntity.ok(dto);
    }

    //Metodo Delete tem que passar um parametro para excluir. Nesse caso e o ID.
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarUsuario(@PathVariable Integer id) {
        usuarioService.excluirUsuario(id);
        return ResponseEntity.status(204).build();
    }

    @PostMapping("/login")
    public ResponseEntity<Token> logar(@RequestBody UsuarioDTO usuario) {

        Token token = usuarioService.gerarToken(usuario);

        return ResponseEntity.ok(token);
    }

}
