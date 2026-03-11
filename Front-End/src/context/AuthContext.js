"use client"

import { createContext, useContext, useState } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {

    const [token, setToken] = useState(null)

    const login = (tokenRecebido) => {

        localStorage.setItem("token", tokenRecebido)
        setToken(tokenRecebido)

    }

    const logout = () => {

        localStorage.removeItem("token")
        setToken(null)

    }

    return (

        <AuthContext.Provider value={{ token, login, logout }}>

            {children}

        </AuthContext.Provider>

    )
}

export function useAuth(){
    return useContext(AuthContext)
}