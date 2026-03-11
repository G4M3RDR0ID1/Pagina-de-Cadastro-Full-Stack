export const metadata = {
  title: "Projeto Full Stack",
  description: "Next.js + Spring Boot API"
}

export default function RootLayout({ children }) {

  return (

    <html lang="pt-BR">

      <body>

        {children}

      </body>

    </html>

  )

}