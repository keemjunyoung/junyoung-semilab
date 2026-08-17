import { useState } from "react";
import { Github, Menu, X } from "lucide-react";
import "./styles.css";

type Page = "profile" | "process-data";

const education = [
  {
    title: "사우고등학교",
    meta: "졸업",
    detail: "Sau High School",
  },
  {
    title: "인천대학교 기계공학과",
    meta: "졸업예정",
    detail: "Mechanical Engineering",
  },
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
  {
    title: "첨단정밀가공",
    meta: "Course",
    detail: "반도체 8대 공정 관련 내용 학습",
  },
  {
    title: "MEMS",
    meta: "Course",
    detail: "반도체·MEMS 제작 공정 학습",
  },
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
    title: "Semiconductor Process Data — Cleaning & EDA",
    status: "준비 중",
    description: "공정 데이터를 정제하고 분포, 결측치, 상관관계를 확인하며 데이터 구조를 이해합니다.",
  },
  {
    index: "02",
    title: "Process Anomaly Classification",
    status: "준비 중",
    description: "정상·이상 패턴을 구분하고 분류 결과를 공정 관점에서 해석하는 과정을 기록합니다.",
  },
  {
    index: "03",
    title: "Feature Importance & Engineering Insight",
    status: "준비 중",
    description: "공정 결과에 영향을 주는 변수를 분석하고 모델 결과를 엔지니어 관점의 인사이트로 연결합니다.",
  },
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
            설계·자동화 프로젝트 경험과 반도체 공정 학습을 바탕으로, 앞으로는 실제 공정 데이터를
            직접 다루고 분석한 과정을 이곳에 기록합니다.
          </p>
          <a
            className="github-link"
            href="https://github.com/keemjunyoung/junyoung-semilab"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={15} /> github.com/keemjunyoung
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
          반도체 공정 데이터를 직접 다루며 공부한 과정과 분석 결과를 쌓는 공간입니다.
          데이터 전처리, 시각화, 모델링뿐 아니라 공정 변수의 의미와 결과 해석까지 함께 기록합니다.
        </p>
      </header>

      <div className="process-flow" aria-label="Analysis flow">
        <span>Understand process</span>
        <span>Clean & analyze data</span>
        <span>Interpret engineering meaning</span>
      </div>

      <div className="portfolio-list">
        {processPortfolio.map((project) => (
          <article className="portfolio-row" key={project.index}>
            <span className="portfolio-index">{project.index}</span>
            <div className="portfolio-main">
              <div className="portfolio-title">
                <h2>{project.title}</h2>
                <span>{project.status}</span>
              </div>
              <p>{project.description}</p>
            </div>
          </article>
        ))}
      </div>

      <p className="portfolio-footnote">
        첫 데이터 분석부터 데이터셋, 코드, 시각화, 해석을 프로젝트 단위로 순서대로 추가할 예정입니다.
      </p>
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

  return (
    <div className="site-shell">
      <header className="topbar">
        <button className="wordmark" onClick={() => moveTo("profile")}>
          Junyoung's SemiLab
        </button>

        <nav className="desktop-nav" aria-label="Main navigation">
          <button className={page === "profile" ? "active" : ""} onClick={() => moveTo("profile")}>
            Profile
          </button>
          <button className={page === "process-data" ? "active" : ""} onClick={() => moveTo("process-data")}>
            Process Data
          </button>
        </nav>

        <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Menu">
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </header>

      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <button className={page === "profile" ? "active" : ""} onClick={() => moveTo("profile")}>
            Profile
          </button>
          <button className={page === "process-data" ? "active" : ""} onClick={() => moveTo("process-data")}>
            Process Data
          </button>
        </nav>
      )}

      <main>{page === "profile" ? <ProfilePage /> : <ProcessDataPage />}</main>

      <footer>
        <span>Junyoung's SemiLab</span>
        <span>Semiconductor Process · Data</span>
      </footer>
    </div>
  );
}
