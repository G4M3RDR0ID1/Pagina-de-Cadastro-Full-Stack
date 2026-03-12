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
            router.push("/login")
            return
        }

        api.get("/usuarios")
        .then(res => setUsuarios(res.data))
        .catch(err => console.log(err))

    },[token, router])

    return(

        <div>

            <h1>Dashboard</h1>

            <h2>Usuario: {nomeUsuario} </h2>

            <button onClick={()=>{
                logout()
                router.push("/login")
            }}>
                Logout
            </button>
            
            <h3>Usuários cadastrados</h3>

            {usuarios.map(u=>(
                <p key={u.id}>
                    {u.nome} - {u.email}
                </p>
            ))}

        </div>

    )
}