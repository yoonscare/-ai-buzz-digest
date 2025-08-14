"use client"

import { useState } from "react"
import type { Article } from "@/types/article"
import { Clock, TrendingUp, ExternalLink, Sparkles, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [summary, setSummary] = useState<string>("")

  const handleSummarize = async () => {
    if (summary) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: article.link }),
      })

      const data = await response.json()
      if (data.success) {
        setSummary(data.data.summary)
      } else {
        setSummary("요약을 생성할 수 없습니다.")
      }
    } catch (error) {
      setSummary("요약을 생성하는 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="group relative overflow-hidden bg-white/80 backdrop-blur-xl border border-gray-200/50 hover:border-blue-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-400/10 hover:-translate-y-2">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-indigo-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardHeader className="pb-4 relative z-10">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs font-bold bg-blue-100 text-blue-700 border-blue-200/50">
              #{article.rank}
            </Badge>
            {article.trending && (
              <Badge className="text-xs bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-lg animate-pulse">
                <TrendingUp className="w-3 h-3 mr-1" />
                인기
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Clock className="w-3 h-3" />
            {article.readTime}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 relative z-10">
        {article.imageUrl && (
          <div className="relative overflow-hidden rounded-xl aspect-video bg-gray-100">
            <img
              src={article.imageUrl || "/placeholder.svg"}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        )}

        <div className="space-y-4">
          <h3 className="font-heading font-bold text-xl leading-tight line-clamp-2 text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
            {article.title}
          </h3>

          {article.summary && (
            <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
              {article.summary}
            </p>
          )}

          <div className="flex items-center gap-3 pt-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSummarize}
                  className="flex-1 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300 hover:text-blue-800 transition-all duration-300"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  {isLoading ? "AI 분석 중..." : "AI 요약"}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl bg-white border-gray-200">
                <DialogHeader>
                  <DialogTitle className="text-left line-clamp-2 text-gray-900 font-heading text-xl">
                    {article.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  {article.imageUrl && (
                    <img
                      src={article.imageUrl || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-64 object-cover rounded-xl"
                    />
                  )}
                  <div className="prose prose-sm max-w-none">
                    {isLoading ? (
                      <div className="flex flex-col items-center justify-center py-12">
                        <div className="relative">
                          <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-300 border-t-blue-600"></div>
                          <Brain className="w-6 h-6 text-blue-600 absolute top-3 left-3 animate-pulse" />
                        </div>
                        <p className="text-gray-600 mt-4 font-medium">AI가 기사를 분석하고 있습니다...</p>
                      </div>
                    ) : (
                      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                        <div className="flex items-center gap-2 mb-4">
                          <Sparkles className="w-5 h-5 text-blue-600" />
                          <span className="text-blue-700 font-semibold">AI 요약</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-base">
                          {summary || article.summary || 'AI 요약을 생성하려면 "AI 요약" 버튼을 클릭하세요.'}
                        </p>
                      </div>
                    )}
                  </div>
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-lg"
                  >
                    <a href={article.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      원문 보기
                    </a>
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
            >
              <a href={article.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
