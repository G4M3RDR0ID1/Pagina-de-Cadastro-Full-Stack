package br.com.criandoapi.projeto.controller;

import br.com.criandoapi.projeto.repository.IUsuario;
import br.com.criandoapi.projeto.model.Usuario;
import br.com.criandoapi.projeto.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/usuarios")
public class UsuarioController{

    private UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService ) {
        this.usuarioService = usuarioService;
    }

    //Metodo Get
    @GetMapping
    public ResponseEntity<List<Usuario>> listaUsuarios(){
        return ResponseEntity.status(200).body(usuarioService.listarUSuarios());
    }


    //Metodo Post
    @PostMapping
    public ResponseEntity<Usuario> criarUsuario(@Valid @RequestBody Usuario usuario){
        return ResponseEntity.status(201).body(usuarioService.criarUsuario(usuario));
    }

    //Metodo Update
    @PutMapping
    public ResponseEntity<Usuario> editarUsuario(@Valid @RequestBody Usuario usuario){
        return ResponseEntity.status(200).body(usuarioService.editarUsuario(usuario));
    }

    //Metodo Delete tem que passar um parametro para excluir. Nesse caso e o ID.
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarUsuario(@PathVariable Integer id){
        usuarioService.excluirUsuario(id);
        return ResponseEntity.status(204).build();
    }

    @PostMapping("/login")
    public ResponseEntity<Usuario> validarSenha(@RequestBody Usuario usuario){
        boolean valid = usuarioService.validarSenha(usuario);
        if(!valid){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.status(200).build();
    }

    //Metodo responsavel por interceptar a Bad_Request e mostrar os erros (ex: "A senha e obrigatoria")
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationException(MethodArgumentNotValidException exception){
        Map<String, String> errors = new HashMap<>();

        exception.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError)  error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        return errors;
    }
}
