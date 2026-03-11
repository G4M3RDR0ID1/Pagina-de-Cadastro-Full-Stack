"use client"

import { useEffect,useState } from "react"
import { API_URL } from "@/services/api"

export default function Dashboard(){

    const [usuarios,setUsuarios] = useState([])

    useEffect(()=>{

        const token = localStorage.getItem("token")

        fetch(`${API_URL}/usuarios`,{
            headers:{
                Authorization: token
            }
        })
        .then(res=>res.json())
        .then(data=>setUsuarios(data))

    },[])

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