"use client"

import { useState } from "react"
import { api } from "@/services/api"
import { useRouter } from "next/navigation"

export default function Cadastro(){

    const [nome,setNome] = useState("")
    const [email,setEmail] = useState("")
    const [senha,setSenha] = useState("")
    const [telefone,setTelefone] = useState("")
    const [erro, setErro] = useState("")
    const router = useRouter()
    

    const cadastrar = async (event) => {

        event.preventDefault()
        setErro("")

        try {

            await api.post("/usuarios",{
                nome,
                email,
                senha,
                telefone: telefone.replace(/\D/g,"")
            })
            

            alert("Usuário cadastrado com sucesso!")
            router.push("/login")

        } catch (err) {

            if (err.response?.data) {

                const data = err.response.data

                if (typeof data === "string") {
                    setErro(data)
                }

                else if (typeof data === "object") {
                    const mensagens = Object.values(data).join(" | ")
                    setErro(mensagens)
                }

            } else {

               setErro("Erro ao cadastrar usuário")

            }

        }

    }


    const formatarTelefone = (valor) => {
    // remove tudo que não for número
    valor = valor.replace(/\D/g, "")

    // limita a 11 números
    valor = valor.slice(0, 11)

    // aplica máscara
    if (valor.length > 10) {
        valor = valor.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3")
    } else if (valor.length > 6) {
        valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3")
    } else if (valor.length > 2) {
        valor = valor.replace(/^(\d{2})(\d{0,5})/, "($1) $2")
    } else if (valor.length > 0) {
        valor = valor.replace(/^(\d*)/, "($1")
    }

    return valor
    
    }

    return(

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <form
            onSubmit={cadastrar}
            className="bg-white p-8 rounded-lg shadow-md w-80 space-y-3">

                <h1 className="text-2xl font-bold mb-6 text-center">
                    Cadastro
                </h1>

                {erro && (
                    <p className="bg-red-100 text-red-700 p-2 rounded text-center">
                        {erro}
                    </p>
                )}
                
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
                onKeyDown={(e) => {
                if (e.key === " ") {
                    e.preventDefault()
                }
                }}
                onChange={(e)=>setSenha(e.target.value)}
                />

                <input
                className="w-full border p-2 mb-4 rounded"
                placeholder="Telefone"
                value={telefone}
                onChange={(e)=>setTelefone(formatarTelefone(e.target.value))}
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