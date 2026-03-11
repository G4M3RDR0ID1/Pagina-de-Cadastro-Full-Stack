"use client"

import { useState } from "react"
import { API_URL } from "@/services/api"

export default function Login(){

    const [email,setEmail] = useState("")
    const [senha,setSenha] = useState("")

    async function login(e){

        e.preventDefault()

        const res = await fetch(`${API_URL}/usuarios/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                senha
            })
        })

        const data = await res.json()

        localStorage.setItem("token",data.token)

        window.location.href="/dashboard"
    }

    return(

        <div>

            <h1>Login</h1>

            <form onSubmit={login}>

                <input placeholder="Email"
                onChange={(e)=>setEmail(e.target.value)} />

                <input type="password"
                placeholder="Senha"
                onChange={(e)=>setSenha(e.target.value)} />

                <button>Entrar</button>

            </form>

        </div>

    )
}