# 보드게임 커뮤니티 서비스 - Frontend

보드게임을 함께 즐길 사람들을 찾고, 모임을 만들고, 참여할 수 있는 위치 기반 커뮤니티 플랫폼입니다.

<img width="500" height="519" alt="보드메이트 메인페이지" src="https://github.com/user-attachments/assets/eaefe16f-3a40-4523-bf06-5e9cc801d858" /> <img width="500" height="519" alt="보드메이트 상세페이지" src="https://github.com/user-attachments/assets/e91d5377-8a0b-48d3-8b97-394525bbc442" />

## 프로젝트 소개

### 서비스 개요

-   보드게임 모임을 생성하고 참여할 수 있는 커뮤니티 서비스
-   카카오/구글 소셜 로그인을 통한 간편한 회원가입
-   위치 기반으로 내 주변의 보드게임 모임 검색
-   모바일 퍼스트 디자인으로 언제 어디서나 편리한 사용

### 핵심 기능

| 기능           | 설명                                  |
| -------------- | ------------------------------------- |
| 소셜 로그인    | Kakao, Google OAuth 기반 인증         |
| 모임 생성/관리 | 게임, 장소, 일시, 인원 설정           |
| 모임 검색      | 키워드, 지역, 게임 기반 필터링        |
| 참여 관리      | 모임 신청, 취소, 참여 현황 확인       |
| 위치 서비스    | Kakao Map 연동 장소 검색 및 지도 표시 |

---

## 구현 목표

### 기술적 목표

1. **최신 React 생태계 활용**: React 19, Next.js 16 App Router, React Compiler 적용
2. **효율적인 상태 관리**: Zustand를 활용한 경량 전역 상태 관리 아키텍처 구축
3. **안전한 인증 시스템**: JWT 기반 Access/Refresh Token 이중 토큰 전략 구현
4. **최적화된 사용자 경험**: 디바운스 검색, 무한 스크롤, 스켈레톤 UI 적용
5. **모바일 퍼스트**: 375px 기준 반응형 레이아웃, BottomSheet 기반 인터랙션

### 비즈니스 목표

1. 보드게임 커뮤니티 활성화를 위한 접근성 높은 플랫폼 제공
2. 위치 기반 서비스로 오프라인 모임 연결 촉진
3. 간편한 UX로 신규 사용자 진입 장벽 최소화

---

## 구현 내용

### 1. 인증 시스템

-   NextAuth v5 기반 Kakao/Google OAuth 소셜 로그인
-   Access Token + Refresh Token 이중 토큰 관리
-   토큰 만료 시 자동 갱신 (동시 요청 방지 Promise 캐싱)
-   클라이언트/서버 양쪽에서 사용 가능한 인증 fetch 유틸리티

### 2. 상태 관리

-   **UI 상태**: BottomSheet, Modal, Toast 전역 제어
-   **비즈니스 상태**: 검색어 (localStorage persist), 지역 설정 (sessionStorage)
-   **폼 상태**: 게시물 작성 시 게임/장소/날짜 선택 상태 분리 관리

### 3. 모임 기능

-   게시물 CRUD (생성, 조회, 수정, 삭제)
-   참가 신청/취소 및 상태 실시간 동기화
-   마이페이지에서 참여 현황 관리 (참여중/대기중/내가 만든 모임)

### 4. 검색 및 필터링

-   500ms 디바운스 검색으로 API 호출 최적화
-   Intersection Observer 기반 무한 스크롤 (페이지당 15건)
-   최근 검색어 자동 저장 (최대 10개, localStorage)

### 5. 위치 서비스

-   Kakao Map API 연동 (주소 검색, 좌표 변환, 장소 검색)
-   Geolocation API로 현재 위치 기반 지역 설정
-   API Route 프록시로 API 키 보안 처리

### 6. UI/UX

-   모바일 최적화 BottomSheet (3가지 높이 변형)
-   스켈레톤 UI로 로딩 중 레이아웃 시프트 방지
-   Toast 알림으로 사용자 액션 피드백 제공
-   react-hook-form으로 폼 상태 및 유효성 관리

---

## 사용 기술

### Core

| 기술       | 버전    | 용도                              |
| ---------- | ------- | --------------------------------- |
| Next.js    | 16.0.10 | App Router 기반 풀스택 프레임워크 |
| React      | 19.2.0  | UI 라이브러리                     |
| TypeScript | 5.x     | 정적 타입 검사                    |

### 상태 관리 & 데이터

| 기술            | 버전          | 용도           |
| --------------- | ------------- | -------------- |
| Zustand         | 5.0.9         | 전역 상태 관리 |
| react-hook-form | 7.66.1        | 폼 상태 관리   |
| next-auth       | 5.0.0-beta.30 | OAuth 인증     |

### UI & 스타일링

| 기술         | 버전 | 용도              |
| ------------ | ---- | ----------------- |
| Tailwind CSS | 4.x  | 유틸리티 기반 CSS |
| Pretendard   | -    | 웹폰트            |

### 최적화 & 유틸리티

| 기술                        | 버전   | 용도              |
| --------------------------- | ------ | ----------------- |
| React Compiler              | 1.0.0  | 자동 메모이제이션 |
| react-intersection-observer | 10.0.0 | 무한 스크롤       |

### 외부 서비스

| 서비스        | 용도                |
| ------------- | ------------------- |
| Kakao OAuth   | 소셜 로그인         |
| Google OAuth  | 소셜 로그인         |
| Kakao Map API | 지도 및 위치 서비스 |
| Netlify       | 배포                |

---

## 핵심 아키텍처

### 프로젝트 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── api/               # API Routes (인증, 위치)
│   ├── board/             # 게시판 (목록, 상세, 작성)
│   ├── mypage/            # 마이페이지
│   ├── search/            # 검색
│   ├── signup/            # 회원가입
│   └── login/             # 로그인
│
├── components/             # 재사용 컴포넌트
│   ├── common/            # 공통 UI (Button, Card, Modal 등)
│   ├── bottom-sheet/      # 바텀시트 (게임/장소/시간 선택)
│   ├── board/             # 게시판 관련
│   └── ...
│
├── hooks/                  # 커스텀 훅
│   ├── useAuthFetch.ts    # 인증 API 호출
│   ├── useDebounce.ts     # 디바운스
│   └── useRegion.ts       # 위치 서비스
│
├── stores/                 # Zustand 스토어
│   ├── useBottomSheetStore.ts
│   ├── useModalStore.tsx
│   ├── post/              # 게시물 관련 상태
│   └── mypage/            # 마이페이지 상태
│
├── types/                  # TypeScript 타입 정의
├── util/                   # 유틸리티 함수
└── auth.ts                # NextAuth 설정
```

### 인증 흐름

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────▶│  NextAuth   │────▶│  Backend    │
│  (OAuth)    │     │  Callback   │     │  API Server │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  JWT Token  │
                    │  (Access +  │
                    │  Refresh)   │
                    └─────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
┌─────────────┐    ┌───────────────┐    ┌─────────────┐
│ useAuthFetch│    │serverAuthFetch│    │  Middleware │
│  (Client)   │    │   (Server)    │    │  (Route     │
│             │    │               │    │   Guard)    │
└─────────────┘    └───────────────┘    └─────────────┘
```

### 상태 관리 구조

```
┌─────────────────────────────────────────────────────┐
│                    Zustand Stores                   │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌────────────┐  ┌─────────────┐  ┌───────────────┐ │
│  │ UI State   │  │ Feature     │  │ Persist       │ │
│  │            │  │ State       │  │ State         │ │
│  ├────────────┤  ├─────────────┤  ├───────────────┤ │
│  │BottomSheet │  │ DateStore   │  │ SearchStore   │ │
│  │ Modal      │  │ GameStore   │  │ (localStorage)│ │
│  │ Toast      │  │ PlaceStore  │  │ RegionStore   │ │
│  │            │  │ MyPageStore │  │ (session)     │ │
│  └────────────┘  └─────────────┘  └───────────────┘ │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 컴포넌트 계층 구조

```
RootLayout
├── Providers (SessionProvider)
│   ├── BottomSheet (Global)
│   ├── Modal (Global)
│   ├── ToastMessage (Global)
│   └── Pages
│       ├── HomePage
│       │   └── CardList → Card
│       ├── SearchPage
│       │   ├── SearchClient
│       │   ├── ChipGroup
│       │   └── CardList
│       ├── BoardDetailPage
│       │   ├── Header
│       │   ├── PlaceSection (KakaoMap)
│       │   ├── MemberList
│       │   └── MeetingJoinButton
│       └── ...
```

### API 통신 패턴

```typescript
// 클라이언트 컴포넌트 - 인증 필요
const { authFetch, isReady } = useAuthFetch();
const res = await authFetch("/api/meetings");

// 서버 컴포넌트 - 인증 필요
const { data, error } = await serverAuthFetch<Post[]>("/api/meetings");

// API Route - 외부 API 프록시
// /api/location/keyword2places → Kakao Map API
```

---

## 주요 기술적 특징

### 1. 토큰 갱신 동시 요청 방지

```typescript
// src/auth.ts
let refreshPromise: Promise<JWT> | null = null;

async function refreshAccessToken(token: JWT) {
    // 같은 refreshToken으로 갱신 중이면 기존 Promise 재사용
    if (refreshPromise && currentRefreshToken === token.refreshToken) {
        return refreshPromise;
    }
    // ...
}
```

### 2. 애니메이션-상태 타이밍 동기화

```typescript
// src/stores/useBottomSheetStore.ts
setClose: () => {
    set({ isOpen: false });
    // CSS 트랜지션(400ms) 완료 후 children 초기화
    setTimeout(() => set({ children: null }), 400);
};
```

### 3. 디바운스 + 무한스크롤 최적화

```typescript
// src/app/search/useSearch.ts
const debouncedQuery = useDebounce(query, 500);
const { ref, inView } = useInView();

useEffect(() => {
    if (inView && !isLoading && hasMore) {
        fetchSearchResult(debouncedQuery, page);
    }
}, [inView]);
```

### 4. 폼 데이터 임시 저장

```typescript
// src/components/signup/SignupForm.tsx
// 페이지 이탈 시 sessionStorage에 저장
// 복귀 시 defaultValues에서 복원
const { register } = useForm({
    defaultValues: {
        nickname: sessionStorage.getItem("nickname") || "",
    },
});
```

---

## 시작하기

### 환경 변수 설정

```bash
# .env.local
KAKAO_CLIENT_ID=your_kakao_client_id
KAKAO_CLIENT_SECRET=your_kakao_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_API_SERVER_HOST=your_backend_api_url
NEXT_PUBLIC_KAKAO_MAP_API_KEY=your_kakao_map_api_key
AUTH_SECRET=your_nextauth_secret
```

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start
```

### 브라우저에서 확인

```
http://localhost:3000
```

---

## 배포

Vercel을 통해 배포되고 있습니다.

https://boardmates.vercel.app/login
