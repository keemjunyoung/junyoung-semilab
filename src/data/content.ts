export type StudyNote = {
  id: string;
  title: string;
  category: string;
  tags: string[];
  summary: string;
  updated: string;
};

export type PaperItem = {
  id: string;
  title: string;
  field: string;
  authors: string;
  source: string;
  year: string;
  note: string;
  tags: string[];
  link?: string;
};

export const studyNotes: StudyNote[] = [
  {
    id: "note-01",
    title: "반도체 8대 공정",
    category: "Process",
    tags: ["8대 공정", "Fab", "Process"],
    summary: "산화부터 테스트까지 전체 공정의 흐름과 각 공정에서 장비가 담당하는 역할을 정리합니다.",
    updated: "2026.08"
  },
  {
    id: "note-02",
    title: "Vacuum & Plasma",
    category: "Equipment",
    tags: ["Vacuum", "Plasma", "Pump", "Gauge"],
    summary: "진공 형성 원리, 펌프와 게이지, 플라즈마의 기본 개념을 공정·설비 관점으로 정리합니다.",
    updated: "2026.08"
  },
  {
    id: "note-03",
    title: "TSV · HBM · Advanced Packaging",
    category: "Packaging",
    tags: ["TSV", "HBM", "2.5D", "3D Packaging"],
    summary: "TSV에서 HBM으로 이어지는 구조와 첨단패키징 기술의 흐름을 공부하고 기록합니다.",
    updated: "2026.08"
  },
  {
    id: "note-04",
    title: "BM · PM · Equipment Improvement",
    category: "Equipment",
    tags: ["BM", "PM", "Maintenance"],
    summary: "사후정비, 예방정비, 설비 개선의 차이를 실제 장비 운용 관점에서 구분해 정리합니다.",
    updated: "2026.08"
  }
];

export const papers: PaperItem[] = [
  {
    id: "paper-01",
    title: "Radiative heat transfer in the extreme near field",
    field: "Thermal / Nanoscale",
    authors: "Paper archive",
    source: "Nature",
    year: "Study archive",
    note: "극근접장 열전달을 공부하며 정리했던 논문. 이후 핵심 그림, 실험 조건, 내가 이해한 내용 중심으로 노트를 추가할 예정입니다.",
    tags: ["Near-field", "Heat Transfer", "Nano"]
  },
  {
    id: "paper-02",
    title: "Ultra-High Vacuum Scanning Thermal Microscopy for Nanometer Resolution",
    field: "Vacuum / Metrology",
    authors: "Paper archive",
    source: "Research paper",
    year: "Study archive",
    note: "초고진공 환경과 나노 열계측 관련 학습 자료. 장비 구성과 측정 원리를 중심으로 정리할 예정입니다.",
    tags: ["UHV", "SThM", "Metrology"]
  }
];
