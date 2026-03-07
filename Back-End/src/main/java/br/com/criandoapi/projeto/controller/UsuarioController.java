package br.com.criandoapi.projeto.controller;

import br.com.criandoapi.projeto.DAO.IUsuario;
import br.com.criandoapi.projeto.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/usuarios")
public class UsuarioController{

    @Autowired
    private IUsuario dao;

    //Metodo Get
    @GetMapping
    public ResponseEntity<List<Usuario>> listaUsuarios(){
        List<Usuario> lista = (List<Usuario>) dao.findAll();
        return ResponseEntity.status(200).body(lista);
    }


    //Metodo Post
    @PostMapping
    public ResponseEntity<Usuario> criarUsuario(@RequestBody Usuario usuario){
        Usuario usuarioNovo = dao.save(usuario);
        return ResponseEntity.status(201).body(usuarioNovo);
    }

    //Metodo Update
    @PutMapping
    public ResponseEntity<Usuario> atualizarUsuario(@RequestBody Usuario usuario){
        Usuario usuarioNovo = dao.save(usuario);
        return ResponseEntity.status(201).body(usuarioNovo);
    }

    //Metodo Delete tem que passar um parametro para excluir. Nesse caso e o ID.
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarUsuario(@PathVariable Integer id){
        dao.deleteById(id);
        return ResponseEntity.status(204).build();
    }
}
