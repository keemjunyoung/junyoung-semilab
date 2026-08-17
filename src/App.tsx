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

const training = [
  {
    title: "성균관대학교 센서 반도체 물성 분석 교육",
    meta: "24h",
    detail: "반도체 물성 및 센서 관련 교육",
  },
  {
    title: "반도체 공정기술 부트캠프",
    meta: "Semiconductor Process",
    detail: "반도체 공정 중심 직무 교육",
  },
  {
    title: "지역청년 반도체 직무역량 향상 과정",
    meta: "Semiconductor",
    detail: "반도체 직무 및 공정 역량 교육",
  },
  {
    title: "서울시립대학교 머신러닝 데이터 교육",
    meta: "20h",
    detail: "머신러닝과 데이터 분석 기초",
  },
  {
    title: "반도체 직무 스터디 구성·운영",
    meta: "Study",
    detail: "8대 공정부터 TSV, HBM, 2.5D 패키징까지 학습",
  },
];

const activities = [
  {
    title: "인천대학교 창의적 종합설계대회",
    result: "대상",
    detail: "비전인식을 활용한 LiDAR 렌즈 자동초점 장치 설계·제작",
  },
  {
    title: "성균관대학교 거점 전국 창의적 종합설계대회",
    result: "공학혁신상",
    detail: "LiDAR 렌즈 자동초점 시스템 프로젝트",
  },
  {
    title: "제3회 SDGs 소셜벤처 챔피언쉽",
    result: "장려상",
    detail: "미세조류 기반 자동화 시스템 프로젝트",
  },
  {
    title: "iGEM Jamboree",
    result: "Participation",
    detail: "바이오파운더리 프로젝트 DRYLAB 기계 파트",
  },
  {
    title: "Samsung E&A 제14회 에너지·환경 탐구대회",
    result: "수상",
    detail: "미세조류 기반 절삭유 정화 및 데이터 활용 프로젝트",
  },
];

const processPortfolio = [
  {
    index: "01",
    title: "Semiconductor Process Data — Data Cleaning & EDA",
    status: "준비 중",
    description:
      "반도체 공정 데이터를 정제하고 변수의 분포, 결측치, 상관관계를 확인하는 과정을 기록합니다.",
    tags: ["Preprocessing", "EDA", "Visualization"],
  },
  {
    index: "02",
    title: "Process Anomaly Classification",
    status: "준비 중",
    description:
      "공정 데이터에서 정상·이상 패턴을 구분하고 모델의 판단 결과를 공정 관점에서 해석하는 과정을 기록합니다.",
    tags: ["Classification", "Anomaly", "Semiconductor"],
  },
  {
    index: "03",
    title: "Feature Importance & Engineering Insight",
    status: "준비 중",
    description:
      "예측 정확도에서 끝내지 않고 어떤 공정 변수가 결과에 영향을 주는지 분석하고 엔지니어 관점의 해석을 남깁니다.",
    tags: ["Feature Importance", "SHAP", "Insight"],
  },
];

function ProfilePage() {
  return (
    <section className="page profile-page">
      <div className="profile-hero">
        <div className="profile-photo-wrap">
          <img
            className="profile-photo"
            src="/profile.png"
            alt="김준영 프로필"
            onError={(event) => {
              event.currentTarget.style.display = "none";
              const fallback = event.currentTarget.nextElementSibling as HTMLElement | null;
              if (fallback) fallback.style.display = "grid";
            }}
          />
          <div className="profile-photo-fallback" aria-hidden="true">
            KJY
          </div>
        </div>

        <div className="profile-intro">
          <p className="section-label">PROFILE</p>
          <h1>김준영</h1>
          <p className="profile-role">Mechanical Engineering · Semiconductor</p>
          <p className="profile-copy">
            기계공학을 기반으로 반도체 공정과 설비를 공부하고 있습니다. 공정 데이터를 직접 다루고,
            분석 과정과 판단 근거를 기록하며 데이터 활용 역량을 쌓는 것을 목표로 합니다.
          </p>
          <a
            className="github-link"
            href="https://github.com/keemjunyoung/junyoung-semilab"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={15} /> GitHub
          </a>
        </div>
      </div>

      <div className="profile-section">
        <div className="section-head">
          <span>01</span>
          <h2>Education</h2>
        </div>
        <div className="simple-list">
          {education.map((item) => (
            <div className="simple-row" key={item.title}>
              <div>
                <strong>{item.title}</strong>
                <p>{item.detail}</p>
              </div>
              <span>{item.meta}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="profile-section">
        <div className="section-head">
          <span>02</span>
          <h2>Education & Training</h2>
        </div>
        <div className="simple-list">
          {training.map((item) => (
            <div className="simple-row" key={item.title}>
              <div>
                <strong>{item.title}</strong>
                <p>{item.detail}</p>
              </div>
              <span>{item.meta}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="profile-section">
        <div className="section-head">
          <span>03</span>
          <h2>Awards & Activities</h2>
        </div>
        <div className="simple-list">
          {activities.map((item) => (
            <div className="simple-row activity-row" key={item.title}>
              <div>
                <strong>{item.title}</strong>
                <p>{item.detail}</p>
              </div>
              <span>{item.result}</span>
            </div>
          ))}
        </div>
      </div>
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
          반도체 공정 데이터를 직접 다루며 공부한 과정, 코드, 시각화와 해석을 하나씩 쌓아가는
          포트폴리오입니다. 완성된 결과뿐 아니라 문제를 정의하고 데이터를 해석한 과정까지 기록합니다.
        </p>
      </header>

      <div className="data-principles">
        <div>
          <span>01</span>
          <strong>Understand</strong>
          <p>공정과 변수의 의미를 먼저 이해합니다.</p>
        </div>
        <div>
          <span>02</span>
          <strong>Analyze</strong>
          <p>데이터를 정제·시각화하고 패턴을 찾습니다.</p>
        </div>
        <div>
          <span>03</span>
          <strong>Interpret</strong>
          <p>모델 결과를 엔지니어 관점에서 해석합니다.</p>
        </div>
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
              <div className="inline-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="empty-note">
        <span>+</span>
        <div>
          <strong>첫 분석부터 순서대로 추가할 예정입니다.</strong>
          <p>데이터셋 · 코드 · 시각화 · 결과 해석을 프로젝트 단위로 기록합니다.</p>
        </div>
      </div>
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
          <button
            className={page === "process-data" ? "active" : ""}
            onClick={() => moveTo("process-data")}
          >
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
          <button
            className={page === "process-data" ? "active" : ""}
            onClick={() => moveTo("process-data")}
          >
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
