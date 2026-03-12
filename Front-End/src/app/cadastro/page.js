"use client"

import { useState } from "react"
import { api } from "@/services/api"
import { useRouter } from "next/navigation"

export default function Cadastro(){

    const [nome,setNome] = useState("")
    const [email,setEmail] = useState("")
    const [senha,setSenha] = useState("")
    const [telefone,setTelefone] = useState("")
    const router = useRouter()

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
            router.push("/login")

        } catch (err) {

            console.log(err)
            alert("Erro ao cadastrar usuário")

        }

    }

    return(

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <form
            onSubmit={cadastrar}
            className="bg-white p-8 rounded-lg shadow-md w-80 space-y-3">

                <h1 className="text-2xl font-bold mb-6 text-center">
                    Cadastro
                </h1>

                <input
                className="w-full border p-2 mb-3 rounded"
                placeholder="Nome"
                onChange={(e)=>setNome(e.target.value)}
                />

                <input
                className="w-full border p-2 mb-3 rounded"
                placeholder="Email"
                onChange={(e)=>setEmail(e.target.value)}
                />

                <input
                type="password"
                className="w-full border p-2 mb-3 rounded"
                placeholder="Senha"
                onChange={(e)=>setSenha(e.target.value)}
                />

                <input
                className="w-full border p-2 mb-4 rounded"
                placeholder="Telefone"
                onChange={(e)=>setTelefone(e.target.value)}
                />

                <button
                className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition duration-200">
                    Cadastrar
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