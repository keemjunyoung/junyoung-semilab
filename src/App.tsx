import { useMemo, useState } from "react";
import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import { papers, studyNotes } from "./data/content";
import "./styles.css";

type Section = "profile" | "notes" | "papers";

const navItems: { id: Section; label: string }[] = [
  { id: "profile", label: "Profile" },
  { id: "notes", label: "Study Notes" },
  { id: "papers", label: "Paper Library" }
];

const noteCategories = ["All", "Process", "Equipment", "Packaging"];

export default function App() {
  const [section, setSection] = useState<Section>("profile");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [noteQuery, setNoteQuery] = useState("");
  const [paperQuery, setPaperQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filteredNotes = useMemo(() => {
    const q = noteQuery.trim().toLowerCase();
    return studyNotes.filter((note) => {
      const categoryMatch = category === "All" || note.category === category;
      const text = `${note.title} ${note.summary} ${note.tags.join(" ")}`.toLowerCase();
      return categoryMatch && (!q || text.includes(q));
    });
  }, [noteQuery, category]);

  const filteredPapers = useMemo(() => {
    const q = paperQuery.trim().toLowerCase();
    return papers.filter((paper) => {
      const text = `${paper.title} ${paper.field} ${paper.source} ${paper.note} ${paper.tags.join(" ")}`.toLowerCase();
      return !q || text.includes(q);
    });
  }, [paperQuery]);

  const navigate = (next: Section) => {
    setSection(next);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <button className="wordmark" onClick={() => navigate("profile")}>Junyoung's SemiLab</button>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={section === item.id ? "active" : ""}
              onClick={() => navigate(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button className="menu-button" onClick={() => setMobileOpen((open) => !open)} aria-label="메뉴 열기">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {mobileOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={section === item.id ? "active" : ""}
              onClick={() => navigate(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}

      <main>
        {section === "profile" && <ProfilePage onNavigate={navigate} />}
        {section === "notes" && (
          <StudyNotesPage
            query={noteQuery}
            setQuery={setNoteQuery}
            category={category}
            setCategory={setCategory}
            notes={filteredNotes}
          />
        )}
        {section === "papers" && (
          <PaperLibraryPage query={paperQuery} setQuery={setPaperQuery} papers={filteredPapers} />
        )}
      </main>

      <footer>
        <span>Junyoung's SemiLab</span>
        <span>Semiconductor study archive · 2026</span>
      </footer>
    </div>
  );
}

function ProfilePage({ onNavigate }: { onNavigate: (section: Section) => void }) {
  return (
    <section className="page profile-page">
      <div className="profile-intro">
        <p className="section-label">PROFILE</p>
        <h1>김준영</h1>
        <p className="profile-role">Mechanical Engineering · Semiconductor Equipment & Process</p>
        <p className="profile-copy">
          반도체 공정과 설비를 공부하며 이해한 내용을 기록하고, 논문과 기술 자료를 한곳에 쌓기 위해 만든 개인 아카이브입니다.
          단순히 자료를 모으기보다 제가 이해한 방식으로 다시 정리하고 연결하는 것을 목표로 합니다.
        </p>
      </div>

      <div className="profile-meta">
        <div>
          <span>Focus</span>
          <p>Semiconductor Equipment · Process · Advanced Packaging</p>
        </div>
        <div>
          <span>Learning</span>
          <p>Vacuum · Plasma · HBM · PM/BM · Data & AI</p>
        </div>
        <div>
          <span>Purpose</span>
          <p>Study notes, paper archive, and engineering thinking.</p>
        </div>
      </div>

      <div className="profile-links">
        <button onClick={() => onNavigate("notes")}>Study Notes <ArrowUpRight size={16} /></button>
        <button onClick={() => onNavigate("papers")}>Paper Library <ArrowUpRight size={16} /></button>
      </div>
    </section>
  );
}

function StudyNotesPage({ query, setQuery, category, setCategory, notes }: any) {
  return (
    <section className="page">
      <PageHeading
        label="STUDY NOTES"
        title="반도체 공부 기록"
        description="공정, 설비, 패키징을 공부하며 이해한 내용을 짧고 명확하게 쌓는 공간입니다."
      />

      <div className="controls">
        <label className="search-field">
          <Search size={17} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="노트 검색" />
        </label>
        <div className="category-tabs">
          {noteCategories.map((item) => (
            <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="list-section">
        {notes.map((note: any) => (
          <article className="note-row" key={note.id}>
            <div className="note-index">{note.category}</div>
            <div className="note-main">
              <div className="note-heading">
                <h2>{note.title}</h2>
                <span>{note.updated}</span>
              </div>
              <p>{note.summary}</p>
              <div className="inline-tags">
                {note.tags.map((tag: string) => <span key={tag}>{tag}</span>)}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="empty-entry">
        <span>+</span>
        <div>
          <strong>새로운 공부 내용을 계속 추가하는 공간</strong>
          <p>이후 Markdown 또는 데이터베이스와 연결해 직접 노트를 추가할 수 있도록 확장할 예정입니다.</p>
        </div>
      </div>
    </section>
  );
}

function PaperLibraryPage({ query, setQuery, papers: paperItems }: any) {
  return (
    <section className="page">
      <PageHeading
        label="PAPER LIBRARY"
        title="논문 · 연구 자료 아카이브"
        description="읽은 논문과 앞으로 읽을 자료를 분야별로 모으고, 핵심 내용과 내 해석을 함께 기록합니다."
      />

      <div className="controls paper-controls">
        <label className="search-field">
          <Search size={17} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="논문 제목, 분야, 키워드 검색" />
        </label>
      </div>

      <div className="paper-list">
        {paperItems.map((paper: any) => (
          <article className="paper-row" key={paper.id}>
            <div className="paper-meta">
              <span>{paper.field}</span>
              <small>{paper.source}</small>
            </div>
            <div className="paper-main">
              <h2>{paper.title}</h2>
              <p className="paper-authors">{paper.authors} · {paper.year}</p>
              <p className="paper-note">{paper.note}</p>
              <div className="inline-tags">
                {paper.tags.map((tag: string) => <span key={tag}>{tag}</span>)}
              </div>
            </div>
            {paper.link && (
              <a href={paper.link} target="_blank" rel="noreferrer" aria-label="논문 링크 열기">
                <ArrowUpRight size={18} />
              </a>
            )}
          </article>
        ))}
      </div>

      <div className="empty-entry">
        <span>+</span>
        <div>
          <strong>논문을 쌓아가는 라이브러리</strong>
          <p>다음 단계에서 URL, DOI, PDF 링크와 개인 메모를 저장할 수 있도록 기능을 붙일 수 있습니다.</p>
        </div>
      </div>
    </section>
  );
}

function PageHeading({ label, title, description }: { label: string; title: string; description: string }) {
  return (
    <div className="page-heading">
      <p className="section-label">{label}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
