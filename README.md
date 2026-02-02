<div align="center">
<h1>📈 Finora</h1>
<p><strong>스마트 금융 계산기</strong></p>
<p>복리 계산, 투자 수익률, 대출 상환, 은퇴 설계 등 다양한 재무 계산을 지원하는 세련된 금융 계산기</p>

[![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev)
</div>

---

## ✨ Features

- 📊 **9가지 금융 계산기**: 복리, 단리, 저축 목표, ROI, 대출, 은퇴 자금, 인플레이션, 팁, 손익분기점
- 🌍 **20개 언어 지원**: 한국어, 영어, 일본어, 중국어, 스페인어, 포르투갈어, 태국어, 베트남어, 프랑스어, 독일어, 이탈리아어, 러시아어, 아랍어, 힌디어, 인도네시아어, 네덜란드어, 터키어, 폴란드어, 스웨덴어, 벵골어
- 🎨 **세련된 UI**: 붉은색 계열의 현대적인 디자인
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 모두 지원
- 🔒 **에러 핸들링**: Error Boundary로 안정적인 사용자 경험
- ⚡ **빠른 로딩**: 코드 스플리팅과 Suspense로 최적화
- 🔍 **SEO 최적화**: 메타 태그, Open Graph, Schema.org 지원
- 📦 **PWA 지원**: 설치 가능한 웹 앱

---

## 🚀 Vercel 배포

### 사전 준비사항

1. **Vercel 계정**: [vercel.com](https://vercel.com)에서 가입
2. **GitHub 계정**: 코드를 호스팅할 저장소
3. **(선택) 도메인**: 커스텀 도메인 사용 시
4. **(선택) Google Analytics**: `VITE_GA_ID` 환경변수
5. **(선택) Google AdSense**: `VITE_ADSENSE_ID` 환경변수

### 배포 방법

#### 방법 1: GitHub 연동 (권장)

1. **GitHub에 프로젝트 push**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/finora.git
   git push -u origin main
   ```

2. **Vercel Dashboard 설정**
   - [Vercel Dashboard](https://vercel.com/dashboard) 접속
   - "Add New Project" 클릭
   - GitHub 저장소 import
   - Framework Preset: `Vite` 선택 (자동 감지됨)
   - Deploy 클릭

3. **환경 변수 설정 (선택사항)**
   - Vercel Dashboard → Project Settings → Environment Variables
   
   | 변수명 | 설명 | 예시 |
   |--------|------|------|
   | `VITE_GA_ID` | Google Analytics ID | `G-XXXXXXXXXX` |
   | `VITE_ADSENSE_ID` | Google AdSense ID | `ca-pub-XXXXXXXXXXXXXXXX` |
   | `VITE_APP_ENV` | 앱 환경 | `production` |

4. **도메인 설정 (선택사항)**
   - Project Settings → Domains
   - 커스텀 도메인 추가 또는 Vercel 제공 도메인 사용
   - **중요**: `robots.txt`와 `sitemap.xml`의 도메인을 실제 도메인으로 업데이트

#### 방법 2: Vercel CLI 사용

1. **Vercel CLI 설치**
   ```bash
   npm i -g vercel
   ```

2. **로그인 및 배포**
   ```bash
   vercel login
   vercel
   ```

3. **프로덕션 배포**
   ```bash
   vercel --prod
   ```

---

## 🛠️ 로컬 개발

### Prerequisites

- Node.js 18+ 
- npm 또는 yarn

### 설치 및 실행

1. **의존성 설치**
   ```bash
   npm install
   ```

2. **환경 변수 설정 (선택사항)**
   ```bash
   cp .env.example .env.local
   # .env.local 파일에 필요한 환경변수 설정
   ```

3. **개발 서버 실행**
   ```bash
   npm run dev
   ```
   - http://localhost:3000 에서 확인

4. **프로덕션 빌드 테스트**
   ```bash
   npm run build
   npm run preview
   ```

---

## 📁 프로젝트 구조

```
finora/
├── components/          # React 컴포넌트
│   ├── AdBanner.tsx           # 광고 배너 (AdSense 지원)
│   ├── ErrorBoundary.tsx      # 에러 핸들링
│   ├── Loading.tsx            # 로딩 컴포넌트
│   ├── InputField.tsx         # 입력 필드
│   ├── ResultDisplay.tsx      # 결과 표시
│   └── *Calculator.tsx        # 각종 계산기 컴포넌트
├── hooks/              # 커스텀 훅
│   └── useLocalization.ts     # 다국어 지원 훅
├── public/             # 정적 파일
│   ├── locales/               # 번역 파일 (20개 언어)
│   ├── favicon.svg
│   ├── manifest.json          # PWA 매니페스트
│   ├── robots.txt             # 검색엔진 크롤링 설정
│   └── sitemap.xml            # 사이트맵
├── App.tsx             # 메인 앱 컴포넌트
├── index.tsx           # 진입점
├── constants.ts        # 상수 정의
├── types.ts            # TypeScript 타입
├── utils.ts            # 유틸리티 함수
├── seo.ts              # SEO 설정
├── vite.config.ts      # Vite 설정
├── vercel.json         # Vercel 배포 설정
├── tsconfig.json       # TypeScript 설정
└── package.json        # 의존성 및 스크립트
```

---

## 📝 빌드 설정

- **Framework**: Vite + React + TypeScript
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Node Version**: 18+

---

## 🔒 보안 헤더

`vercel.json`에 다음 보안 헤더가 설정되어 있습니다:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- Assets 캐싱: `Cache-Control: public, max-age=31536000, immutable`

---

## 🔧 배포 후 체크리스트

### 필수 확인사항

- [ ] 사이트 접속 확인
- [ ] 언어 변경 기능 확인
- [ ] 각 계산기 정상 작동 확인
- [ ] 모바일 반응형 확인
- [ ] 404 페이지 확인

### SEO 확인사항

- [ ] `robots.txt` 도메인 업데이트
- [ ] `sitemap.xml` 도메인 업데이트
- [ ] Google Search Console 등록
- [ ] Naver Search Advisor 등록

### 선택 설정사항

- [ ] Google Analytics 설정 (`VITE_GA_ID`)
- [ ] Google AdSense 설정 (`VITE_ADSENSE_ID`)
- [ ] 커스텀 도메인 연결
- [ ] SSL 인증서 확인

---

## 🐛 문제 해결

### 빌드 실패 시

```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 환경변수 적용 안 될 때

Vercel Dashboard에서 환경변수 추가 후 **반드시 재배포** 실행

### 광고가 표시되지 않을 때

- `VITE_ADSENSE_ID`가 올바르게 설정되어 있는지 확인
- AdSense 계정이 승인되었는지 확인
- 광고 차단기 비활성화

---

## 📄 라이선스

MIT License

---

<p align="center">Made with ❤️ by withYM</p>
