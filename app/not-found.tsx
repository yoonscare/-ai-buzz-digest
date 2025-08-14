"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Brain, Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-violet-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <Brain className="w-24 h-24 text-blue-600 mx-auto mb-4" />
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">페이지를 찾을 수 없습니다</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              홈으로 돌아가기
            </Link>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            이전 페이지
          </Button>
        </div>
      </div>
    </div>
  )
}
