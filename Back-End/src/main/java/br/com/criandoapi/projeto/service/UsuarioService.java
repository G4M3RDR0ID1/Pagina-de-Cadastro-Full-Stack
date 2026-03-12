package br.com.criandoapi.projeto.service;

import br.com.criandoapi.projeto.dto.UsuarioDTO;
import br.com.criandoapi.projeto.dto.UsuarioResponseDTO;
import br.com.criandoapi.projeto.model.Usuario;
import br.com.criandoapi.projeto.repository.IUsuario;
import br.com.criandoapi.projeto.security.Token;
import br.com.criandoapi.projeto.security.TokenUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    private IUsuario repository;
    private PasswordEncoder passwordEncoder;
    private TokenUtil tokenUtil;

    public UsuarioService(IUsuario repository, TokenUtil tokenUtil, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.tokenUtil = tokenUtil;
        this.passwordEncoder = passwordEncoder;
    }

    public Usuario criarUsuario(Usuario usuario) {

        // verifica se já existe usuário com esse email
        if(repository.findByEmail(usuario.getEmail()) != null){
            throw new RuntimeException("Email já cadastrado");
        }

        // valida senha
        if(usuario.getSenha() == null || usuario.getSenha().isBlank()){
            throw new RuntimeException("Senha é obrigatória");
        }

        String encoder = this.passwordEncoder.encode(usuario.getSenha());
        usuario.setSenha(encoder);
        Usuario usuarioNovo = repository.save(usuario);
        return usuarioNovo;
    }

    public Usuario editarUsuario(Usuario usuario) {
        String encoder = this.passwordEncoder.encode(usuario.getSenha());
        usuario.setSenha(encoder);
        Usuario usuarioEditado = repository.save(usuario);
        return usuarioEditado;
    }

    public boolean excluirUsuario(Integer id) {
        repository.deleteById(id);
        return true;
    }

    public boolean validarSenha(Usuario usuario) {
        String senha = repository.getById(usuario.getId()).getSenha();
        boolean valid = passwordEncoder.matches(usuario.getSenha(), senha);
        return valid;
    }

    public Token gerarToken(UsuarioDTO usuario) {

        Usuario user = repository.findByEmail(usuario.getEmail());

        if (user != null) {

            boolean valid = passwordEncoder.matches(usuario.getSenha(), user.getSenha());

            if (valid) {
                return new Token(tokenUtil.createToken(user));
            }
        }

        return null;
    }

    public List<UsuarioResponseDTO> listarUsuarios() {

        List<Usuario> usuarios = repository.findAll();

        return usuarios.stream().map(usuario -> {
            UsuarioResponseDTO dto = new UsuarioResponseDTO();
            dto.setId(usuario.getId());
            dto.setNome(usuario.getNome());
            dto.setEmail(usuario.getEmail());
            dto.setTelefone(usuario.getTelefone());
            return dto;
        }).toList();

    }
}
