import { type NextRequest, NextResponse } from "next/server"
import * as cheerio from "cheerio"

// 동적 렌더링 설정
export const dynamic = 'force-dynamic'

async function getArticleDetails(url: string) {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "ko-KR,ko;q=0.9,en;q=0.8",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    let content = ""
    const contentSelectors = [
      "#article-view-content-div",
      ".user-snax-post-submission-content",
      ".td-post-content",
      ".article-content",
      ".entry-content",
      "article .content",
      ".post-content",
    ]

    for (const selector of contentSelectors) {
      const found = $(selector).text().trim()
      if (found && found.length > 100) {
        content = found
        break
      }
    }

    if (!content) {
      const articleContent = $("article").text().trim()
      if (articleContent && articleContent.length > 100) {
        content = articleContent
      } else {
        content = $("body").text().trim()
      }
    }

    let summary = ""
    if (content) {
      const cleanContent = content
        .replace(/\s+/g, " ")
        .replace(/\n+/g, " ")
        .replace(/\t+/g, " ")
        .replace(/관련기사|기사목록|댓글|공유|인쇄|스크랩/g, "")
        .trim()

      const sentences = cleanContent.split(/[.!?]/)
      const meaningfulSentences = sentences.filter((s) => s.trim().length > 20).slice(0, 3)

      summary = meaningfulSentences.join(". ").substring(0, 300).trim()
      if (summary && !summary.endsWith(".")) {
        summary += "..."
      }
    }

    return {
      summary: summary || "기사 내용을 요약할 수 없습니다.",
    }
  } catch (error) {
    console.error("Error getting article details:", error)
    return {
      summary: "기사 내용을 불러올 수 없습니다.",
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "유효한 URL이 필요합니다.",
        },
        { status: 400 },
      )
    }

    const details = await getArticleDetails(url)

    return NextResponse.json({
      success: true,
      data: details,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
