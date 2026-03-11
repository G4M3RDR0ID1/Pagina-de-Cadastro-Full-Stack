"use client"

import { useEffect, useState } from "react"
import { api } from "@/services/api"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

export default function Dashboard(){

    const [usuarios,setUsuarios] = useState([])

    const { token } = useAuth()

    const router = useRouter()

    useEffect(()=>{

        if(!token){
            router.push("/login")
            return
        }

        api.get("/usuarios",{
            headers:{
                Authorization: token
            }
        })
        .then(res => setUsuarios(res.data))
        .catch(err => console.log(err))

    },[token, router])

    return(

        <div>

            <h1>Usuários</h1>

            {usuarios.map(u=>(
                <p key={u.id}>
                    {u.nome} - {u.email}
                </p>
            ))}

        </div>

    )
}