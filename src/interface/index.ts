export interface RowGrade {
  type: "subject" | "term-label" | "overview";
  subject?: Subject;
  overview?: Overview;
  termName?: string;
  children?: RowGrade[];
  key?: string;
}
export type TypeGrade = undefined | null | number;
// Define the structure of a subject
export interface Subject {
  rowIndex?: TypeGrade;
  index?: TypeGrade;
  idSubject?: TypeGrade;
  name: string;
  totalCredit?: TypeGrade;
  creditPractical?: TypeGrade;
  creditTheory?: TypeGrade;
  midTerm?: TypeGrade;
  diligence: string;
  theory1?: TypeGrade;
  theory2?: TypeGrade;
  theory3?: TypeGrade;
  theory4?: TypeGrade;
  theory5?: TypeGrade;
  theory6?: TypeGrade;
  theory7?: TypeGrade;
  theory8?: TypeGrade;
  theory9?: TypeGrade;
  practical1?: TypeGrade;
  practical2?: TypeGrade;
  practical3?: TypeGrade;
  practical4?: TypeGrade;
  practical5?: TypeGrade;
  endTerm?: TypeGrade;
  finalGrade10?: TypeGrade;
  finalGrade4?: TypeGrade;
  finalGradeChar: string;
  level: string;
  description: string;
  disable: boolean;
}
export type KeySubjectGrade = {
  [K in keyof Subject]: Subject[K] extends TypeGrade ? K : never;
}[keyof Subject];

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
export interface Term {
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
export interface TermData {
  terms: Term[];
}
