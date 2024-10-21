export interface RowGrade {
  type: "subject" | "term-label" | "overview";
  subject?: Subject;
  overview?: Overview;
  termName?: string;
  children?: RowGrade[];
  key?: string;
}

// Define the structure of a subject
export interface Subject {
  rowIndex?: number | null;
  index?: number | null;
  idSubject?: number | null;
  name: string;
  totalCredit: number;
  creditPractical?: number | null;
  creditTheory?: number | null;
  midTerm?: number | null;
  diligence: string;
  theory1?: number | null;
  theory2?: number | null;
  theory3?: number | null;
  theory4?: number | null;
  theory5?: number | null;
  theory6?: number | null;
  theory7?: number | null;
  theory8?: number | null;
  theory9?: number | null;
  practical1?: number | null;
  practical2?: number | null;
  practical3?: number | null;
  practical4?: number | null;
  practical5?: number | null;
  endTerm?: number | null;
  finalGrade10?: number | null;
  finalGrade4?: number | null;
  finalGradeChar: string;
  level: string;
  description: string;
  disable: boolean;
}

// Define the structure of term overview
export interface Overview {
  avg10?: number | null;
  avg4?: number | null;
  avgAccumulator10?: number | null;
  avgAccumulator4?: number | null;
  totalCreditRegister?: number | null;
  totalCreditAccumulator?: number | null;
  totalCreditPass?: number | null;
  totalCreditFail?: number | null;
  levelAccumulator: string;
  levelTerm: string;
}

// Define the structure of a term
export interface Grade {
  startRowIndex?: number | null;
  endRowIndex?: number | null;
  term: string;
  subjects: Subject[];
  overview: Overview;
  termId?: number | null;
  totalCredit?: number | null;
  totalCreditAccumulator?: number | null;
}

// Define the structure of grades which contains multiple terms
export interface GradesData {
  grades: Grade[];
}
