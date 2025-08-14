export interface Article {
  id: string
  rank: number
  title: string
  link: string
  summary?: string
  imageUrl?: string
  readTime?: string
  trending?: boolean
  category: string
  date: string
}

export interface ApiResponse {
  success: boolean
  data: Article[]
  timestamp: string
}
