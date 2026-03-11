package br.com.criandoapi.projeto.dto;

import lombok.Data;

@Data
public class UsuarioResponseDTO {
    private Integer id;
    private String nome;
    private String email;
    private String telefone;
}
