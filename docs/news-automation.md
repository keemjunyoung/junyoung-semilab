# Semiconductor News Automation

## Goal

Naver 검색 결과를 직접 스크래핑하지 않고 Naver Search API를 이용해 반도체 관련 뉴스 메타데이터를 수집합니다.

수집 흐름:

1. GitHub Actions가 매일 실행됩니다.
2. `scripts/fetch-naver-news.mjs`가 Naver Search API를 호출합니다.
3. 반도체 공정/장비/HBM/EUV/식각/증착/첨단 패키징/반도체 AI 키워드 결과를 수집합니다.
4. 중복 링크를 제거하고 최신 기사만 `public/data/news.json`에 저장합니다.
5. GitHub Actions가 변경된 JSON을 커밋합니다.
6. Cloudflare Pages가 새 커밋을 자동 배포합니다.
7. 홈페이지 `News & Tech` 메뉴에서 결과를 표시합니다.

## One-time setup

Naver Developers에서 애플리케이션을 등록하고 Search API를 사용할 수 있는 Client ID와 Client Secret을 발급받습니다.

GitHub 저장소에서 다음 두 Repository Secret을 등록합니다.

- `NAVER_CLIENT_ID`
- `NAVER_CLIENT_SECRET`

경로:

`Repository > Settings > Secrets and variables > Actions > New repository secret`

두 Secret이 등록되면 GitHub의 `Actions > Fetch semiconductor news > Run workflow`에서 한 번 수동 실행해 확인할 수 있습니다.

## Important

- Client Secret은 React 코드나 `public/` 폴더에 절대 넣지 않습니다.
- 현재 자동 수집은 기사 제목, 검색 설명, 링크, 발행일 등 검색 결과 메타데이터를 저장합니다.
- 기사 본문 전체를 복사해 저장하지 않습니다.
- 이후 `My Take`와 기술 요약은 기사 원문을 확인한 뒤 별도 기록하는 구조로 확장합니다.
