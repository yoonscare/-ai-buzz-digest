import { NextResponse } from "next/server"
import * as cheerio from "cheerio"

// 동적 렌더링 설정
export const dynamic = 'force-dynamic'

interface Article {
  id: string
  rank: number
  title: string
  link: string
  category: string
  date: string
  summary?: string
  imageUrl?: string
  readTime?: string
  trending?: boolean
}

// AI Times Most Popular 기사 크롤링
async function crawlAITimesMostPopular(): Promise<Article[]> {
  try {
    console.log("Starting crawl of AI Times Most Popular...")
    const response = await fetch("https://www.aitimes.com/", {
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
    const articles: Article[] = []

    // Most Popular 섹션 찾기
    $(".item").each(function () {
      if (articles.length >= 10) return false

      const rankElement = $(this).find(".number")
      const rank = rankElement.text().trim()

      const linkElement = $(this).find('a[href*="/news/articleView.html"]')
      const link = linkElement.attr("href")
      const titleElement = linkElement.find("h2.auto-titles")
      const title = titleElement.length > 0 ? titleElement.text().trim() : linkElement.text().trim()

      if (link && title && rank) {
        const fullLink = link.startsWith("http") ? link : `https://www.aitimes.com${link}`
        if (!articles.find((a) => a.link === fullLink)) {
          articles.push({
            id: `article-${rank}`,
            rank: Number.parseInt(rank, 10) || articles.length + 1,
            title: title.replace(/\s+/g, " ").trim(),
            link: fullLink,
            category: "AI News",
            date: new Date().toISOString().split("T")[0],
          })
        }
      }
    })

    // 폴백: 일반 기사 링크
    if (articles.length === 0) {
      $('a[href*="/news/articleView.html"]').each(function (index) {
        if (articles.length >= 10) return false

        const link = $(this).attr("href")
        let title = ""

        const h2Title = $(this).find("h2.auto-titles")
        if (h2Title.length > 0) {
          title = h2Title.text().trim()
        } else {
          title = $(this).text().trim()
        }

        title = title.replace(/\s+/g, " ").trim()

        if (link && title && title.length > 10) {
          const fullLink = link.startsWith("http") ? link : `https://www.aitimes.com${link}`
          if (!articles.find((a) => a.link === fullLink)) {
            articles.push({
              id: `article-${articles.length + 1}`,
              rank: articles.length + 1,
              title: title.substring(0, 200),
              link: fullLink,
              category: "AI News",
              date: new Date().toISOString().split("T")[0],
            })
          }
        }
      })
    }

    articles.sort((a, b) => a.rank - b.rank)
    return articles.slice(0, 10)
  } catch (error) {
    console.error("Crawling error:", error)
    throw error
  }
}

// 기사 상세 내용 크롤링 및 요약
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

    let imageUrl = ""
    const imageSelectors = [
      "#article-view-content-div img",
      ".user-snax-post-submission-content img",
      ".td-post-featured-image img",
      ".entry-thumb img",
      ".featured-image img",
      "article img:first-of-type",
      ".post-thumbnail img",
    ]

    for (const selector of imageSelectors) {
      const imgElement = $(selector).first()
      const src = imgElement.attr("src") || imgElement.attr("data-src")

      if (src) {
        if (src.startsWith("//")) {
          imageUrl = `https:${src}`
        } else if (src.startsWith("/")) {
          imageUrl = `https://www.aitimes.com${src}`
        } else if (src.startsWith("http")) {
          imageUrl = src
        }

        if (
          imageUrl &&
          !imageUrl.includes("logo") &&
          !imageUrl.includes("banner") &&
          !imageUrl.includes("ad") &&
          (imageUrl.includes(".jpg") || imageUrl.includes(".png") || imageUrl.includes(".webp"))
        ) {
          break
        }
      }
    }

    if (!imageUrl) {
      const defaultImages = [
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
      ]
      imageUrl = defaultImages[Math.floor(Math.random() * defaultImages.length)]
    }

    const readTime = Math.max(1, Math.ceil(content.length / 250)) + "분"

    return {
      summary: summary || "기사 내용을 요약할 수 없습니다.",
      imageUrl: imageUrl,
      readTime: readTime,
    }
  } catch (error) {
    console.error("Error getting article details:", error)
    return {
      summary: "기사 내용을 불러올 수 없습니다.",
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
      readTime: "3분",
    }
  }
}

export async function GET() {
  try {
    console.log("Fetching articles...")
    const articles = await crawlAITimesMostPopular()

    const articlesWithDetails = await Promise.all(
      articles.map(async (article) => {
        const details = await getArticleDetails(article.link)
        return {
          ...article,
          ...details,
          trending: Math.random() > 0.7,
        }
      }),
    )

    return NextResponse.json({
      success: true,
      data: articlesWithDetails,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
