"use client"

import { useState } from "react"
import { api } from "@/services/api"

export default function Cadastro(){

    const [nome,setNome] = useState("")
    const [email,setEmail] = useState("")
    const [senha,setSenha] = useState("")
    const [telefone,setTelefone] = useState("")

    const cadastrar = async (event) => {

        event.preventDefault()

        try {

            const res = await api.post("/usuarios",{
                nome,
                email,
                senha,
                telefone
            })

            console.log(res.data)

            alert("Usuário cadastrado com sucesso!")

        } catch (err) {

            console.log(err)
            alert("Erro ao cadastrar usuário")

        }

    }

    return(

        <div>

            <h1>Cadastro</h1>

            <form onSubmit={cadastrar}>

                <input
                    placeholder="Nome"
                    onChange={(e)=>setNome(e.target.value)}
                />

                <input
                    placeholder="Email"
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Senha"
                    onChange={(e)=>setSenha(e.target.value)}
                />

                <input
                    placeholder="Telefone"
                    onChange={(e)=>setTelefone(e.target.value)}
                />

                <button type="submit">Cadastrar</button>

            </form>

        </div>

    )
}