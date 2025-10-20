import type React from "react"
import type { Metadata } from "next"
import { Poppins, Great_Vibes } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
})

export const metadata: Metadata = {
  title: "Invitación Mis 15 Años",
  description: "Te invito a celebrar mis 15 años",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${poppins.variable} ${greatVibes.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
