import { convertOverviewSubjectToGrade10, fixedGrade } from ".";
import { Overview, Subject, Term, TypeGrade } from "../interface";
const MIN_END_TERM_SUBJECT = 3;
export const calcOverviewSubject = (subject: Subject) => {
  const theories = filterTypeGrade([
    subject.theory1,
    subject.theory2,
    subject.theory3,
    subject.theory4,
    subject.theory5,
    subject.theory6,
    subject.theory7,
    subject.theory8,
    subject.theory9,
  ]);
  const practicals = filterTypeGrade([
    subject.practical1,
    subject.practical2,
    subject.practical3,
    subject.practical4,
    subject.practical5,
  ]);

  if (!subject.endTerm || subject.endTerm < MIN_END_TERM_SUBJECT) {
    return subject;
  }

  const gradeTheory = calculatorTheory(
    theories,
    subject.midTerm,
    subject.endTerm
  );

  let gradeSubject10 = gradeTheory;

  if (practicals && practicals.length != 0) {
    // subject have practicals grade
    const creditTheory =
      (subject.totalCredit || 1) - (subject.creditPractical || 0);

    gradeSubject10 = calculatorPractical(
      practicals,
      gradeTheory,
      subject.creditPractical || 0,
      creditTheory
    );
  }
  const overviewSubject = convertOverviewSubjectToGrade10(gradeSubject10);

  subject.finalGrade10 = fixedGrade(gradeSubject10, 1);
  subject.finalGrade4 = overviewSubject.finalGrade4;
  subject.finalGradeChar = overviewSubject.finalGradeChar;
  subject.level = overviewSubject.level;

  return subject;
};

const filterTypeGrade = (arrays: TypeGrade[]): number[] => {
  return arrays.filter((e): e is number => typeof e === "number");
};

const calculatorTheory = (
  theories: number[],
  midTerm: number | null | undefined,
  endTerm: number
) => {
  if (!midTerm) {
    return endTerm;
  }

  if (theories.length == 0) {
    return endTerm * 0.5 + midTerm * 0.4;
  }

  let totalTheories = theories.reduce((a, b) => a + b) / theories.length;
  return totalTheories * 0.2 + midTerm * 0.3 + endTerm * 0.5;
};

const calculatorPractical = (
  practicals: number[],
  gradeTheory: number,
  creditPractical: number,
  creditTheory: number
): number => {
  let gradePractical = practicals.reduce((a, b) => a + b) / practicals.length;
  const totalCredit = creditTheory + creditPractical;
  const gradeSubject10 =
    (gradeTheory * creditTheory + gradePractical * creditPractical) /
    totalCredit;

  return gradeSubject10;
};

export const calculatorOverviewTerm = (term: Term): Overview => {
  const overview = term.overview;
  let isMissing = false;
  const overviewResult = term.subjects.reduce(
    (overviewTerm, subject) => {
      if (subject.disable) {
        return overviewTerm;
      }
      if (
        subject.finalGrade10 == null ||
        subject.finalGrade10 == undefined ||
        isNaN(subject.finalGrade10)
      ) {
        return overviewTerm;
      }
      overviewTerm.totalCredit += Number(subject.totalCredit);
      overviewTerm.totalGrade10 +=
        subject.finalGrade10 * Number(subject.totalCredit);
      overviewTerm.totalGrade4 +=
        Number(subject.finalGrade4) * Number(subject.totalCredit);
      return overviewTerm;
    },
    {
      totalCredit: 0,
      totalGrade10: 0,
      totalGrade4: 0,
    }
  );
  if (isMissing) {
    // stop calculator
    overview.avg4 = null;
    overview.avg10 = null;
    overview.levelTerm = "";
    return overview;
  }

  overview.avg10 = overviewResult.totalGrade10 / overviewResult.totalCredit;
  overview.avg4 = overviewResult.totalGrade4 / overviewResult.totalCredit;
  overview.levelTerm = findOverTermLevelByGrade4(overview.avg4);
  console.log(overview);
  return overview;
};

function findOverTermLevelByGrade4(grade4: number) {
  if (grade4 >= 3.6) return "Xuất sắc";
  if (grade4 >= 3.2) return "Giỏi";
  if (grade4 >= 2.5) return "Khá";
  if (grade4 >= 2) return "Trung bình";
  if (grade4 >= 1) return "Trung bình yếu";
  return "Kém";
}
