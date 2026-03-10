package br.com.criandoapi.projeto.model;

import jakarta.persistence.*;
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

    @Column(name = "nome", length = 200, nullable = true)
    private String nome;

    @Column(name = "email", length = 50, nullable = true)
    private String email;

    @Column(name = "senha", columnDefinition = "TEXT", nullable = true)
    private String senha;

    @Column(name = "telefone", length = 15, nullable = true)
    private String telefone;

}
