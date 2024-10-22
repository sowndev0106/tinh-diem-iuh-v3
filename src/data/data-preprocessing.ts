import { Term, Overview, Subject } from "../interface";

export const dataPreprocessing = (data: Term[]) => {
  return data.map((term, index) => {
    const subjects: Subject[] = term.subjects.map((subject, index) => {
      const creditPractical = findPracticalCredit(subject);
      const creditTheory = (subject.totalCredit as number) - creditPractical;
      return {
        ...subject,
        creditPractical,
        creditTheory,
      };
    });

    term.subjects = subjects;
    console.log({ dataProcess: term });
    return term;
  });
};

const findPracticalCredit = (subject: Subject) => {
  try {
    // avg array number theories
    const endTerm = subject.endTerm;
    const midTerm = subject.midTerm;
    const finalGrade10 = subject.finalGrade10;
    const totalCredit = subject.totalCredit;
    const theories = [];

    if (subject.theory1) theories.push(subject.theory1);
    if (subject.theory2) theories.push(subject.theory2);
    if (subject.theory3) theories.push(subject.theory3);
    if (subject.theory4) theories.push(subject.theory4);
    if (subject.theory5) theories.push(subject.theory5);
    if (subject.theory6) theories.push(subject.theory6);
    if (subject.theory7) theories.push(subject.theory7);
    if (subject.theory8) theories.push(subject.theory8);
    if (subject.theory9) theories.push(subject.theory9);

    const practicals: number[] = [];
    if (subject.practical1) practicals.push(subject.practical1);
    if (subject.practical2) practicals.push(subject.practical2);
    if (subject.practical3) practicals.push(subject.practical3);
    if (subject.practical4) practicals.push(subject.practical4);
    if (subject.practical5) practicals.push(subject.practical5);

    if (
      theories.length == 0 ||
      practicals.length == 0 ||
      !midTerm ||
      !endTerm ||
      !finalGrade10 ||
      !totalCredit
    ) {
      return 0;
    }
    const avgTheories =
      theories?.reduce((a: number, b: number) => a + b, 0) / theories.length;
    const avgPracticals =
      practicals?.reduce((a: number, b: number) => a + b, 0) /
      practicals.length;

    if (isNaN(avgTheories) || isNaN(avgPracticals)) {
      return 0;
    }

    const gradeTheory = avgTheories * 0.2 + midTerm * 0.3 + endTerm * 0.5;
    const gradePractical = avgPracticals;

    // find grade practical
    for (
      let creditPractical = 1;
      creditPractical <= totalCredit;
      creditPractical++
    ) {
      const creditTheory = totalCredit - creditPractical;
      const grade =
        (gradeTheory * creditTheory + creditPractical * gradePractical) /
        totalCredit;

      if (Math.round(grade * 10) / 10 == finalGrade10) {
        return creditPractical;
      }
    }
    return 1;
  } catch (error) {
    return 0;
  }
};
