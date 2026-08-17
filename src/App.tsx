import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import "./styles.css";

type Page = "profile" | "process-data" | "problem-lab" | "news-tech";

type NewsItem = {
  id: string;
  title: string;
  description: string;
  link: string;
  originalLink?: string;
  pubDate: string;
  keyword: string;
  source?: string;
};

type NewsFeed = {
  generatedAt: string | null;
  items: NewsItem[];
};

const education = [
  { title: "사우고등학교", meta: "졸업", detail: "Sau High School" },
  { title: "인천대학교 기계공학과", meta: "졸업예정", detail: "Mechanical Engineering" },
];

const awards = [
  {
    title: "인천대학교 창의적 종합설계대회",
    meta: "대상",
    detail: "비전인식을 활용한 LiDAR 렌즈 자동초점 장치 설계·제작",
  },
  {
    title: "성균관대학교 거점 전국 창의적 종합설계대회",
    meta: "공학혁신상",
    detail: "LiDAR 렌즈 자동초점 시스템 프로젝트",
  },
  {
    title: "제3회 SDGs 소셜벤처 챔피언쉽",
    meta: "장려상",
    detail: "미세조류 기반 자동화 시스템 프로젝트",
  },
  {
    title: "소외된 이웃을 위한 창의설계",
    meta: "장려상",
    detail: "아두이노 기반 노인 안전 헬멧 설계",
  },
  {
    title: "Samsung E&A 제14회 에너지·환경 탐구대회",
    meta: "수상",
    detail: "미세조류 기반 절삭유 정화 및 데이터 활용 프로젝트",
  },
];

const training = [
  {
    title: "성균관대학교 센서 반도체 물성 분석 교육",
    meta: "24h",
    detail: "반도체 물성 및 센서 관련 교육",
  },
  {
    title: "반도체 공정기술 부트캠프",
    meta: "Process",
    detail: "반도체 주요 공정과 공정기술 직무 학습",
  },
  {
    title: "지역청년 반도체 직무역량 향상 과정",
    meta: "Semiconductor",
    detail: "반도체 공정 및 직무 역량 교육",
  },
  { title: "첨단정밀가공", meta: "Course", detail: "반도체 8대 공정 관련 내용 학습" },
  { title: "MEMS", meta: "Course", detail: "반도체·MEMS 제작 공정 학습" },
  {
    title: "서울시립대학교 머신러닝 데이터 교육",
    meta: "20h",
    detail: "머신러닝과 데이터 분석 기초",
  },
];

const activities = [
  {
    title: "반도체 직무 스터디 구성·운영",
    meta: "Study",
    detail: "8대 공정부터 TSV, HBM, 2.5D 패키징까지 커리큘럼을 구성해 학습",
  },
  {
    title: "iGEM Jamboree · 바이오파운더리 프로젝트",
    meta: "DRYLAB",
    detail: "미세조류 기반 폐수처리 자동화 장치의 기계 설계·제작",
  },
  {
    title: "공작기계 프로젝트",
    meta: "Team Lead",
    detail: "절삭유 정화·칩 분리 구조 설계 및 기업 협업을 통한 설계 개선",
  },
  {
    title: "반도체 진공·열전달 소그룹 학습",
    meta: "Research Study",
    detail: "진공 기술, 극근접장 열전달 및 열측정 관련 논문·실험 학습",
  },
];

const processPortfolio = [
  {
    index: "01",
    title: "SECOM Semiconductor Process Data Analysis",
    status: "진행 중",
    description:
      "익명화된 반도체 제조 공정 데이터를 이용해 결측치, 변수 분포, Pass/Fail 불균형을 확인하고 불량 신호를 탐색합니다.",
  },
  {
    index: "02",
    title: "Process Anomaly Classification",
    status: "예정",
    description: "정상·이상 패턴을 구분하고 모델 성능보다 실제 이상을 놓치지 않는 판단 기준을 중심으로 분석합니다.",
  },
  {
    index: "03",
    title: "Feature Importance & Engineering Insight",
    status: "예정",
    description: "AI가 제시한 중요 변수를 원인으로 단정하지 않고 설비·공정 점검 우선순위로 해석하는 과정을 기록합니다.",
  },
];

const startingHypotheses = [
  {
    number: "01",
    title: "불량에는 많은 변수가 함께 영향을 줄 수 있다.",
    text: "측정된 센서값뿐 아니라 펌프의 동작·정지 순서, 주변 환경, 계측되지 않은 조건 등 여러 요소가 동시에 영향을 줄 수 있다고 예상한다.",
  },
  {
    number: "02",
    title: "실제 불량을 놓치는 것이 더 큰 문제다.",
    text: "설비 관점에서는 이미 발생한 이상을 놓치지 않고 가능한 원인을 하나씩 점검해 빈틈을 줄이는 과정이 중요하다고 생각한다.",
  },
  {
    number: "03",
    title: "AI 결과는 문제 해결의 시작점이다.",
    text: "중요 변수나 이상 패턴을 AI가 제시하면 바로 원인으로 확정하기보다 실제 설비 상황을 가정하고 추가 데이터와 점검 항목을 통해 판단하고 싶다.",
  },
];

const problemFormat = [
  ["01", "Problem Situation", "실제 Fab과 유사한 가상 설비·공정 상황을 문제로 제시"],
  ["02", "Visual Evidence", "Trend, distribution, correlation, wafer/process chart 등 시각화 자료 확인"],
  ["03", "My Hypothesis", "데이터를 보기 전·후 내가 생각한 원인과 점검 우선순위 기록"],
  ["04", "EDA & AI", "데이터셋을 직접 탐색하고 AI/통계 분석으로 가설을 검증"],
  ["05", "Engineering Action", "실제 설비 엔지니어라면 무엇을 확인·수정·예방할지 결정"],
  ["06", "Reflection", "AI 결과와 내 판단의 차이, 놓친 변수, 다음 문제에서 개선할 점 기록"],
];

const newsTopics = [
  "반도체 공정",
  "반도체 장비",
  "HBM",
  "EUV",
  "식각",
  "증착",
  "첨단 패키징",
  "반도체 AI",
];

function ResumeSection({
  number,
  title,
  items,
}: {
  number: string;
  title: string;
  items: { title: string; meta: string; detail: string }[];
}) {
  return (
    <section className="resume-section">
      <div className="resume-heading">
        <span>{number}</span>
        <h2>{title}</h2>
      </div>
      <div className="resume-list">
        {items.map((item) => (
          <div className="resume-row" key={`${title}-${item.title}`}>
            <div className="resume-text">
              <strong>{item.title}</strong>
              <p>{item.detail}</p>
            </div>
            <span className="resume-meta">{item.meta}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProfilePage() {
  return (
    <section className="page profile-page">
      <div className="profile-hero">
        <div className="profile-photo-wrap">
          <img className="profile-photo" src="/profile.png" alt="김준영 프로필" />
        </div>
        <div className="profile-intro">
          <p className="section-label">PROFILE</p>
          <h1>김준영</h1>
          <p className="profile-role">Mechanical Engineering · Semiconductor Process & Equipment</p>
          <p className="profile-copy">
            인천대학교 기계공학과에서 공부하며 반도체 공정과 설비 분야를 준비하고 있습니다.
            설계·자동화 프로젝트 경험과 반도체 공정 학습을 바탕으로, 실제 공정 데이터를 다루고
            문제를 판단하는 과정을 이곳에 기록합니다.
          </p>
          <a className="github-link" href="https://github.com/keemjunyoung/junyoung-semilab" target="_blank" rel="noreferrer">
            github.com/keemjunyoung
          </a>
        </div>
      </div>
      <ResumeSection number="01" title="Education" items={education} />
      <ResumeSection number="02" title="Awards" items={awards} />
      <ResumeSection number="03" title="Education & Training" items={training} />
      <ResumeSection number="04" title="Projects & Activities" items={activities} />
    </section>
  );
}

function ProcessDataPage() {
  return (
    <section className="page data-page">
      <header className="page-heading">
        <p className="section-label">PROCESS DATA</p>
        <h1>Semiconductor Process Data</h1>
        <p>
          실제 공개 공정 데이터를 이용해 전처리, EDA, 모델링, 결과 해석까지 수행한 결과를 프로젝트 단위로 정리합니다.
          완성된 성능 수치보다 어떤 질문을 던지고 어떤 근거로 판단했는지를 남깁니다.
        </p>
      </header>
      <div className="process-flow" aria-label="Analysis flow">
        <span>Question</span><span>EDA</span><span>Model</span><span>Interpret</span><span>Decision</span>
      </div>
      <div className="portfolio-list">
        {processPortfolio.map((project) => (
          <article className="portfolio-row" key={project.index}>
            <span className="portfolio-index">{project.index}</span>
            <div className="portfolio-main">
              <div className="portfolio-title"><h2>{project.title}</h2><span>{project.status}</span></div>
              <p>{project.description}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="portfolio-footnote">실제 분석 결과와 시각화가 생성되는 순서대로 업데이트합니다.</p>
    </section>
  );
}

function ProblemLabPage() {
  return (
    <section className="page problem-page">
      <header className="page-heading">
        <p className="section-label">EDA & PROBLEM SOLVING</p>
        <h1>Semiconductor Problem Lab</h1>
        <p>
          공정 데이터와 설비 상황을 문제 형태로 받아 직접 판단하는 누적형 학습 공간입니다.
          시각화 자료에서 이상을 관찰하고, 원인을 가정하고, EDA와 AI로 검증한 뒤 실제 설비 조치까지 연결합니다.
        </p>
      </header>

      <section className="lab-section">
        <div className="lab-heading"><span>START</span><h2>My Starting Hypothesis</h2></div>
        <div className="hypothesis-list">
          {startingHypotheses.map((item) => (
            <article className="hypothesis-row" key={item.number}>
              <span>{item.number}</span>
              <div><strong>{item.title}</strong><p>{item.text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="lab-section">
        <div className="lab-heading"><span>FORMAT</span><h2>Every Problem Will Follow This Flow</h2></div>
        <div className="problem-format-list">
          {problemFormat.map(([number, title, text]) => (
            <div className="problem-format-row" key={number}>
              <span>{number}</span><strong>{title}</strong><p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="lab-section">
        <div className="lab-heading"><span>#001</span><h2>First Challenge</h2></div>
        <div className="challenge-row">
          <div>
            <strong>SECOM — Yield Signal Triage</strong>
            <p>수백 개의 익명 공정 변수 중 실제 Fail 검출에 의미 있는 신호를 찾고, 어떤 변수를 우선 점검할지 판단하는 문제.</p>
          </div>
          <span>진행 중</span>
        </div>
        <p className="lab-note">실제 시각화와 문제 상황이 준비되면 이 영역에 문제 → 내 답변 → 분석 → 최종 판단 순서로 누적합니다.</p>
      </section>
    </section>
  );
}

function formatNewsDate(value: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
}

function NewsTechPage() {
  const [feed, setFeed] = useState<NewsFeed>({ generatedAt: null, items: [] });

  useEffect(() => {
    fetch("/data/news.json")
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error("news feed unavailable"))))
      .then((data: NewsFeed) => setFeed(data))
      .catch(() => setFeed({ generatedAt: null, items: [] }));
  }, []);

  return (
    <section className="page news-page">
      <header className="page-heading">
        <p className="section-label">NEWS & TECHNOLOGY</p>
        <h1>Semiconductor News & Tech</h1>
        <p>
          반도체 공정·장비·패키징·AI 관련 뉴스를 자동으로 모으고, 단순 기사 스크랩이 아니라 기술 변화가 공정과 설비에 어떤 의미인지 정리하는 공간입니다.
        </p>
      </header>

      <div className="topic-line">
        {newsTopics.map((topic) => <span key={topic}>{topic}</span>)}
      </div>

      <section className="lab-section">
        <div className="lab-heading"><span>NEWS</span><h2>Collected Articles</h2></div>
        {feed.items.length > 0 ? (
          <div className="news-list">
            {feed.items.map((item) => (
              <article className="news-row" key={item.id}>
                <div className="news-meta"><span>{item.keyword}</span><span>{formatNewsDate(item.pubDate)}</span></div>
                <div className="news-main">
                  <a href={item.originalLink || item.link} target="_blank" rel="noreferrer">{item.title}</a>
                  <p>{item.description}</p>
                  {item.source && <small>{item.source}</small>}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="news-empty">
            <strong>자동 수집 연결 준비 중</strong>
            <p>Naver Search API 키를 연결하면 수집 스크립트가 뉴스를 가져와 이곳에 자동으로 표시합니다.</p>
          </div>
        )}
      </section>

      <section className="lab-section">
        <div className="lab-heading"><span>NOTE</span><h2>Technology Notes</h2></div>
        <div className="tech-note-row">
          <strong>기사 수집 → 기술 핵심 → 공정/설비 영향 → My Take</strong>
          <p>앞으로 중요한 뉴스는 원문 링크와 함께 핵심 기술, 왜 중요한지, 내가 생각한 공정·설비 영향까지 별도로 정리합니다.</p>
        </div>
      </section>
    </section>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>("profile");
  const [menuOpen, setMenuOpen] = useState(false);

  const moveTo = (next: Page) => {
    setPage(next);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems: { key: Page; label: string }[] = [
    { key: "profile", label: "Profile" },
    { key: "process-data", label: "Process Data" },
    { key: "problem-lab", label: "Problem Lab" },
    { key: "news-tech", label: "News & Tech" },
  ];

  const renderPage = () => {
    if (page === "profile") return <ProfilePage />;
    if (page === "process-data") return <ProcessDataPage />;
    if (page === "problem-lab") return <ProblemLabPage />;
    return <NewsTechPage />;
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <button className="wordmark" onClick={() => moveTo("profile")}>Junyoung's SemiLab</button>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <button key={item.key} className={page === item.key ? "active" : ""} onClick={() => moveTo(item.key)}>{item.label}</button>
          ))}
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Menu">
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </header>

      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <button key={item.key} className={page === item.key ? "active" : ""} onClick={() => moveTo(item.key)}>{item.label}</button>
          ))}
        </nav>
      )}

      <main>{renderPage()}</main>
      <footer><span>Junyoung's SemiLab</span><span>Semiconductor Process · Data · Engineering</span></footer>
    </div>
  );
}
