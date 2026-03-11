"use client"

import { useState } from "react"
import { api } from "@/services/api"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

export default function Login(){

    const { login } = useAuth()

    const [email,setEmail] = useState("")
    const [senha,setSenha] = useState("")
    const router = useRouter()

    const logar = async (event) => { 

        event.preventDefault()

        try{

            const res = await api.post("/usuarios/login",{
                email,
                senha
            })

            const token = res.data.token

            login(token)

            router.push("/dashboard")

        }catch(err){

            console.log(err)
            alert("Erro no login")

        }

    }

    return(

        <div>

            <h1>Login</h1>

            <form onSubmit={logar}>

                <input
                    placeholder="Email"
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Senha"
                    onChange={(e)=>setSenha(e.target.value)}
                />

                <button type="submit">Entrar</button>

            </form>

        </div>

    )

}