"use client"

import Link from "next/link"

export default function Home() {

  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">

      <div className="bg-white shadow-lg rounded-lg p-10 text-center max-w-lg">

        <h1 className="text-3xl font-bold mb-4 text-blue-600">
          Sistema de Usuários
        </h1>

        <p className="text-gray-600 mb-6">
          Projeto Fullstack desenvolvido com
          <span className="font-semibold"> Spring Boot </span>
          e
          <span className="font-semibold"> Next.js </span>
          utilizando autenticação JWT.
        </p>

        <div className="flex gap-4 justify-center">

          <Link
            href="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </Link>

          <Link
            href="/cadastro"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Cadastro
          </Link>

        </div>

      </div>

      <footer className="mt-10 text-gray-500 text-sm">
        Desenvolvido por Lucas Lana
      </footer>

    </div>

  )

}