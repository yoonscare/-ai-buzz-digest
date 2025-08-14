"use client"

import { useState, useEffect } from "react"
import type { Article, ApiResponse } from "@/types/article"
import { ArticleCard } from "@/components/article-card"
import { LoadingSkeleton } from "@/components/loading-skeleton"
import { Button } from "@/components/ui/button"
import { RefreshCw, Zap, TrendingUp, Sparkles, Brain } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// 동적 렌더링을 위한 설정
export const dynamic = 'force-dynamic'

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<string>("")

  const fetchArticles = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true)
    } else {
      setLoading(true)
    }

    try {
      const response = await fetch("/api/articles")
      const data: ApiResponse = await response.json()

      if (data.success) {
        setArticles(data.data)
        setLastUpdated(new Date(data.timestamp).toLocaleString("ko-KR"))
      }
    } catch (error) {
      console.error("Failed to fetch articles:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchArticles()

    const interval = setInterval(
      () => {
        fetchArticles(true)
      },
      5 * 60 * 1000,
    )

    return () => clearInterval(interval)
  }, [])

  const trendingCount = articles.filter((article) => article.trending).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-violet-50 to-indigo-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,69,193,0.1),transparent_50%)]" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "1s" }}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200/50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Brain className="w-10 h-10 text-blue-600 animate-pulse-glow" />
                  <Sparkles className="w-4 h-4 text-indigo-600 absolute -top-1 -right-1 animate-pulse" />
                </div>
                <div>
                  <h1 className="text-3xl font-heading font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    AI Buzz Digest
                  </h1>
                  <p className="text-xs text-gray-600 font-medium tracking-wide">POWERED BY INTELLIGENCE</p>
                </div>
              </div>
              <Badge variant="secondary" className="hidden sm:flex bg-blue-100 text-blue-700 border-blue-200">
                <Zap className="w-3 h-3 mr-1" />
                실시간 AI 뉴스
              </Badge>
            </div>

            <div className="flex items-center gap-3">
              {trendingCount > 0 && (
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-lg">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {trendingCount}개 인기
                </Badge>
              )}
              <Button
                onClick={() => fetchArticles(true)}
                disabled={refreshing}
                variant="outline"
                size="sm"
                className="gap-2 bg-white/50 border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
                새로고침
              </Button>
            </div>
          </div>

          {lastUpdated && (
            <p className="text-sm text-gray-600 mt-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              마지막 업데이트: {lastUpdated}
            </p>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 relative z-10">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-700 font-medium">AI Times Most Popular</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent leading-tight">
            AI 업계의
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              최신 트렌드
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            인공지능 업계의 가장 핫한 뉴스와 인사이트를
            <span className="text-blue-600 font-semibold"> AI 요약</span>으로 빠르게 확인하세요
          </p>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <div
                key={article.id}
                className="animate-in fade-in slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-gray-500" />
            </div>
            <p className="text-gray-700 text-lg mb-6">기사를 불러올 수 없습니다.</p>
            <Button
              onClick={() => fetchArticles()}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-lg"
            >
              다시 시도
            </Button>
          </div>
        )}
      </main>

      <footer className="border-t border-gray-200 mt-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-blue-600" />
              <span className="text-lg font-heading font-semibold text-gray-900">AI Buzz Digest</span>
            </div>
            <p className="text-gray-700 mb-2">AI Times 인기 기사를 실시간으로 제공하는 인텔리전트 뉴스 플랫폼</p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <RefreshCw className="w-3 h-3" />
                5분마다 자동 업데이트
              </span>
              <span className="flex items-center gap-1">
                <Brain className="w-3 h-3" />
                AI 기반 요약
              </span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                반응형 디자인
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
