# AI Buzz Digest

AI Times 인기 기사를 실시간으로 제공하는 인텔리전트 뉴스 플랫폼입니다.

## 🚀 주요 기능

- **실시간 AI 뉴스**: AI Times Most Popular 기사 1-10위 실시간 크롤링
- **AI 기반 요약**: 기사 내용을 자동으로 요약하여 제공
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 기기에서 최적화된 경험
- **자동 업데이트**: 5분마다 자동으로 최신 기사 업데이트
- **원문 링크**: 각 기사의 원문으로 바로 이동 가능

## 🛠 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Icons**: Lucide React
- **Web Scraping**: Cheerio
- **Deployment**: Vercel

## 📦 설치 및 실행

### 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

### 환경 변수

현재는 별도의 환경 변수가 필요하지 않습니다.

## 🏗 프로젝트 구조

```
ai-buzz-digest/
├── app/                    # Next.js App Router
│   ├── api/               # API 라우트
│   │   ├── articles/      # 기사 크롤링 API
│   │   └── summarize/     # 기사 요약 API
│   ├── globals.css        # 전역 스타일
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 메인 페이지
├── components/            # React 컴포넌트
│   ├── ui/               # UI 컴포넌트 (Radix UI)
│   ├── article-card.tsx  # 기사 카드 컴포넌트
│   └── loading-skeleton.tsx # 로딩 스켈레톤
├── types/                # TypeScript 타입 정의
└── lib/                  # 유틸리티 함수
```

## 🚀 배포

### Vercel 배포

1. [Vercel](https://vercel.com)에 로그인
2. GitHub 저장소 연결
3. 프로젝트 가져오기
4. 자동 배포 완료

### 환경 설정

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

## 🔧 API 엔드포인트

### GET /api/articles
AI Times Most Popular 기사 1-10위를 크롤링하여 반환합니다.

**응답 예시:**
```json
{
  "success": true,
  "data": [
    {
      "id": "article-1",
      "rank": 1,
      "title": "기사 제목",
      "link": "https://www.aitimes.com/news/articleView.html?idxno=12345",
      "summary": "기사 요약 내용...",
      "imageUrl": "https://images.unsplash.com/...",
      "readTime": "3분",
      "trending": true,
      "category": "AI News",
      "date": "2024-01-01"
    }
  ],
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### POST /api/summarize
특정 URL의 기사를 요약합니다.

**요청:**
```json
{
  "url": "https://www.aitimes.com/news/articleView.html?idxno=12345"
}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "summary": "기사 요약 내용..."
  }
}
```

## 🎨 UI 컴포넌트

- **ArticleCard**: 기사 정보를 카드 형태로 표시
- **LoadingSkeleton**: 로딩 중 스켈레톤 UI
- **Button**: 재사용 가능한 버튼 컴포넌트
- **Badge**: 상태 표시용 배지

## 🔄 자동 업데이트

- 메인 페이지에서 5분마다 자동으로 기사 목록 업데이트
- 새로고침 버튼으로 수동 업데이트 가능
- 마지막 업데이트 시간 표시

## 📱 반응형 디자인

- **모바일**: 1열 그리드
- **태블릿**: 2열 그리드
- **데스크톱**: 3열 그리드
- **대형 화면**: 최대 너비 제한으로 가독성 향상

## 🎯 성능 최적화

- **이미지 최적화**: Next.js Image 컴포넌트 사용
- **코드 분할**: 자동 코드 분할으로 초기 로딩 속도 개선
- **정적 생성**: 가능한 페이지는 정적으로 생성
- **동적 렌더링**: 실시간 데이터는 동적으로 렌더링

## 🐛 문제 해결

### 빌드 오류
- `npm install` 실행 후 다시 빌드
- Node.js 버전 확인 (18.x 이상 권장)

### 크롤링 오류
- 네트워크 연결 확인
- AI Times 웹사이트 접근 가능 여부 확인

## 📄 라이선스

MIT License

## 🤝 기여

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해주세요.
