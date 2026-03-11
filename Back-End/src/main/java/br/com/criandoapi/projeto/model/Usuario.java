package br.com.criandoapi.projeto.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

//Anotação utilizada para utilizar get e set sem a necessidade de estarem no codigo.
@Data
@Entity
@Table(name = "usuario")
public class Usuario {

    //Classe que representa o Objeto usuario, e tambem a tabela Usuario no banco de dados mysql.

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;


    @NotBlank(message = "O nome é obrigatório!")
    @Size(min = 3, message = "O nome deve ter no minimo 3 caracteres!")
    @Column(name = "nome", length = 200, nullable = false)
    private String nome;

    @Email(message = "Insira um email valido!")
    @NotBlank(message = "O email é obrigatório!")
    @Column(name = "email", length = 50, nullable = false)
    private String email;

    @NotBlank(message = "A senha é obrigatório!")
    @Column(name = "senha", columnDefinition = "TEXT", nullable = false)
    private String senha;

    @NotBlank(message = "O telefone é obrigatório!")
    @Column(name = "telefone", length = 15, nullable = false)
    private String telefone;

}
