"use client"

import { useEffect, useState } from "react"
import { api } from "@/services/api"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"

export default function Dashboard(){

    const [usuarios,setUsuarios] = useState([])

    const { token, logout } = useAuth()

    const router = useRouter()

    let nomeUsuario = ""

    if(token){
        const decoded = jwtDecode(token.replace("Bearer ",""))
        nomeUsuario = decoded.sub
    }

    useEffect(()=>{

        if(!token){
            router.push("/")
            return
        }

        api.get("/usuarios")
        .then(res => setUsuarios(res.data))
        .catch(err => console.log(err))

    },[token, router])

    return(

        <div className="min-h-screen bg-gray-100">

            {/* NAVBAR */}

            <div className="flex justify-between items-center bg-blue-600 text-white p-4">

                <h1 className="text-xl font-bold">
                    Sistema de Usuários
                </h1>

                <button
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
                onClick={()=>{
                    logout()
                    router.push("/")
                }}>
                    Logout
                </button>

            </div>

            {/* CONTEÚDO */}

            <div className="max-w-4xl mx-auto mt-10">

                <h2 className="text-2xl font-bold mb-6">
                    Olá {nomeUsuario}
                </h2>

                <h3 className="text-lg font-semibold mb-4">
                    Lista de Usuários
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {usuarios.map(u=>(
                        <div
                        key={u.id}
                        className="bg-white p-4 rounded-lg shadow">

                            <h4 className="font-bold text-lg">
                                {u.nome}
                            </h4>

                            <p className="text-gray-600">
                                {u.email}
                            </p>

                        </div>
                    ))}

                </div>

            </div>

        </div>

    )
}