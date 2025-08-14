import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "AI Buzz Digest - AI Times 실시간 뉴스",
  description: "AI Times 인기 기사를 실시간으로 제공하는 인텔리전트 뉴스 플랫폼",
  keywords: ["AI", "인공지능", "뉴스", "AI Times", "요약", "트렌드"],
  authors: [{ name: "AI Buzz Digest" }],
  openGraph: {
    title: "AI Buzz Digest - AI Times 실시간 뉴스",
    description: "AI Times 인기 기사를 실시간으로 제공하는 인텔리전트 뉴스 플랫폼",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Buzz Digest - AI Times 실시간 뉴스",
    description: "AI Times 인기 기사를 실시간으로 제공하는 인텔리전트 뉴스 플랫폼",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={`${GeistSans.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
