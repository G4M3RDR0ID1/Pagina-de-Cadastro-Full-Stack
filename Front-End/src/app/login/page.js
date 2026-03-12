"use client"

import { useState } from "react"
import { api } from "@/services/api"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

export default function Login(){

    const { login } = useAuth()

    const [email,setEmail] = useState("")
    const [senha,setSenha] = useState("")
    const [erro,setErro] = useState("")

    const router = useRouter()

    const logar = async (event) => {

        event.preventDefault()
        setErro("")

        // validação frontend
        if(!email || !senha){
            setErro("Preencha email e senha")
            return
        }

        try{

            const res = await api.post("/usuarios/login",{
                email,
                senha
            })

            // salva token no contexto
            login(res.data.token)

            router.push("/dashboard")

        }catch(err){

            if(err.response?.data?.message){
                setErro(err.response.data.message)
            }
            else if(err.response?.data?.error){
                setErro(err.response.data.error)
            }
            else{
                setErro("Erro ao realizar login")
            }

        }

    }

    return(

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <form
            onSubmit={logar}
            className="bg-white p-8 rounded-lg shadow-md w-80 space-y-3">

                <h1 className="text-2xl font-bold mb-4 text-center">
                    Login
                </h1>

                {erro && (
                    <p className="bg-red-100 text-red-700 p-2 rounded text-center">
                        {erro}
                    </p>
                )}

                <input
                className="w-full border p-2 rounded"
                placeholder="Email"
                onChange={(e)=>setEmail(e.target.value)}
                />

                <input
                type="password"
                className="w-full border p-2 rounded"
                placeholder="Senha"
                onKeyDown={(e)=>{
                    if(e.key === " "){
                        e.preventDefault()
                    }
                }}
                onChange={(e)=>setSenha(e.target.value)}
                />

                <button
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200">
                    Entrar
                </button>

                <button
                type="button"
                className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition duration-200"
                onClick={() => router.push("/")}>
                    Voltar para Home
                </button>

            </form>

        </div>

    )

}