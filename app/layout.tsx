import "./globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "IT Apprentice Exam Questions",
  description: "Browse and search IT questions for apprentice final exams",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              IT Exam Questions
            </Link>
            <div className="space-x-4">
              <Link href="/apprentices" className="hover:underline">
                Apprentices
              </Link>
              <Link href="/questions" className="hover:underline">
                Questions
              </Link>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}

