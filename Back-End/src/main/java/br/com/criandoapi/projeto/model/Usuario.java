package br.com.criandoapi.projeto.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

//Anotação utilizada para utilizar get e set sem a necessidade de estarem no codigo.
@Data
@Entity
@Table(name = "usuario",
uniqueConstraints = {@UniqueConstraint(columnNames = "email")})
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
    @Column(name = "email", length = 50, nullable = false, unique = true)
    private String email;

    @NotBlank(message = "A senha é obrigatório!")
    @Size(min = 6, message = "A senha deve ter no mínimo 6 caracteres")
    @Column(name = "senha", columnDefinition = "TEXT", nullable = false)
    private String senha;

    @NotBlank(message = "O telefone é obrigatório!")
    @Size(min = 10, max = 15, message = "O telefone deve ter entre 10 e 15 caracteres")
    @Pattern(regexp = "^[0-9]+$", message = "O telefone deve conter apenas números")
    @Column(name = "telefone", length = 15, nullable = false)
    private String telefone;

}
