"use client"

import { useState } from "react"
import { API_URL } from "@/services/api"

export default function Cadastro(){

    const [nome,setNome] = useState("")
    const [email,setEmail] = useState("")
    const [senha,setSenha] = useState("")
    const [telefone,setTelefone] = useState("")

    async function cadastrar(e){

        e.preventDefault()

        const res = await fetch(`${API_URL}/usuarios`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                nome,
                email,
                senha,
                telefone
            })
        })

        const data = await res.json()

        console.log(data)

        alert("Usuário cadastrado!")
    }

    return(

        <div>

            <h1>Cadastro</h1>

            <form onSubmit={cadastrar}>

                <input placeholder="Nome"
                onChange={(e)=>setNome(e.target.value)} />

                <input placeholder="Email"
                onChange={(e)=>setEmail(e.target.value)} />

                <input type="password"
                placeholder="Senha"
                onChange={(e)=>setSenha(e.target.value)} />

                <input placeholder="Telefone"
                onChange={(e)=>setTelefone(e.target.value)} />

                <button>Cadastrar</button>

            </form>

        </div>

    )
}