'use client'

import { Button } from "@/components/ui/button"
import { Brain, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-violet-50 to-indigo-100 flex items-center justify-center">
          <div className="text-center">
            <div className="mb-8">
              <Brain className="w-24 h-24 text-red-600 mx-auto mb-4" />
              <h1 className="text-6xl font-bold text-gray-900 mb-4">500</h1>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">서버 오류가 발생했습니다</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={reset}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                다시 시도
              </Button>
              <Button asChild variant="outline">
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  홈으로 돌아가기
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
