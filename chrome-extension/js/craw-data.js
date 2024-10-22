"use strict";
var listNameSubjectExceptions = [
  "Giáo dục Quốc phòng và an ninh 1",
  "Giáo dục Quốc phòng và an ninh 2",
  "Giáo dục thể chất 1",
  "Giáo dục thể chất 2",
  "Tiếng Anh 2",
  "Tiếng Anh 1",
];
const convertGradeToNumber = (grade) => {
  if (!grade) return NaN;
  return Number(String(grade).trim().replace(",", "."));
};
const calculatorOverviewTerm = (term) => {
  let isMissing = false;
  const overviewTerm = term.subjects.reduce(
    (overviewTerm, subject) => {
      if (subject.disable) {
        return overviewTerm;
      }
      if (
        subject.finalGrade10 == "" ||
        subject.finalGrade10 == undefined ||
        isNaN(subject.finalGrade10)
      ) {
        isMissing = true;
        return overviewTerm;
      }
      overviewTerm.totalCredit += subject.totalCredit;
      overviewTerm.totalGrade10 += subject.finalGrade10 * subject.totalCredit;
      overviewTerm.totalGrade4 += subject.finalGrade4 * subject.totalCredit;
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
    term.overview.avg4 = NaN;
    term.overview.avg10 = NaN;
    term.overview.levelTerm = "";
    return;
  }

  overviewTerm.finalGrade10 =
    overviewTerm.totalGrade10 / overviewTerm.totalCredit;
  overviewTerm.finalGrade4 =
    overviewTerm.totalGrade4 / overviewTerm.totalCredit;
  overviewTerm.level = findOverTermLevelByGrade4(overviewTerm.finalGrade4);

  term.overview.avg4 = overviewTerm.finalGrade4;
  term.overview.avg10 = overviewTerm.finalGrade10;
  term.overview.levelTerm = overviewTerm.level;

  if (term.termId == 0) {
    term.overview.avgAccumulator4 = overviewTerm.finalGrade4;
    term.overview.avgAccumulator10 = overviewTerm.finalGrade10;
    term.overview.levelAccumulator = overviewTerm.level;
  }

  return term;
};
function findOverTermLevelByGrade4(grade4) {
  if (grade4 >= 3.6) return "Xuất sắc";
  if (grade4 >= 3.2) return "Giỏi";
  if (grade4 >= 2.5) return "Khá";
  if (grade4 >= 2) return "Trung bình";
  if (grade4 >= 1) return "Trung bình yếu";
  return "Kém";
}

const crawGrades = () => {
  const grades = [];
  const table = document.querySelectorAll("table")[1];
  const trs = table.querySelectorAll("tbody tr");

  let startRowIndex = 0;
  let term = "";
  let subjects = [];
  let termId = 0;
  for (let i = 0; i < trs.length; i++) {
    const tr = trs[i];
    const tdFirst = tr.querySelector("td:first-child");

    // check colspan exist
    if (tdFirst?.hasAttribute("colspan")) {
      // check lable HK
      if (tdFirst.textContent.trim().startsWith("HK")) {
        term = tdFirst.textContent;
        continue;
      }

      //  is overview final
      const overview = getOverviewsAndAsignKey(tr, termId);
      let totalCredit = subjects.reduce(
        (total, subject) =>
          subject.disable ? total : total + subject.totalCredit,
        0
      );
      let totalCreditAccumulator = grades[grades.length - 1]
        ? grades[grades.length - 1].totalCreditAccumulator + totalCredit
        : totalCredit;

      grades.push({
        startRowIndex,
        endRowIndex: i - 1,
        term,
        subjects,
        overview,
        termId,
        totalCredit,
        totalCreditAccumulator,
      });

      // calculate overview term again to get grade full
      calculatorOverviewTerm(grades[grades.length - 1]);

      term = "";
      subjects = [];
      i = i + 4; // index of tr overview
      startRowIndex = i + 1;
      termId++;
      continue;
    }
    // grade
    const subject = getSubject(tr, i);
    subjects.push(subject);
  }
  return grades;
};

const getSubject = (tr, rowIndex) => {
  let tds = tr.querySelectorAll("td");
  const disable = listNameSubjectExceptions.includes(tds[2].innerText);

  const subject = {
    rowIndex,
    index: convertGradeToNumber(tds[0].innerText),
    idSubject: convertGradeToNumber(tds[1].innerText),
    name: tds[2].innerText,
    totalCredit: convertGradeToNumber(tds[3].innerText),
    creditPractical: 0,
    midTerm: convertGradeToNumber(tds[4].innerText),
    diligence: tds[5].innerText,
    theory1: convertGradeToNumber(tds[6].innerText),
    theory2: convertGradeToNumber(tds[7].innerText),
    theory3: convertGradeToNumber(tds[8].innerText),
    theory4: convertGradeToNumber(tds[9].innerText),
    theory5: convertGradeToNumber(tds[10].innerText),
    theory6: convertGradeToNumber(tds[11].innerText),
    theory7: convertGradeToNumber(tds[12].innerText),
    theory8: convertGradeToNumber(tds[13].innerText),
    theory9: convertGradeToNumber(tds[14].innerText),
    practical1: convertGradeToNumber(tds[15].innerText),
    practical2: convertGradeToNumber(tds[16].innerText),
    practical3: convertGradeToNumber(tds[17].innerText),
    practical4: convertGradeToNumber(tds[18].innerText),
    practical5: convertGradeToNumber(tds[19].innerText),
    endTerm: convertGradeToNumber(tds[20].innerText),
    finalGrade10: convertGradeToNumber(tds[21].innerText),
    finalGrade4: convertGradeToNumber(tds[22].innerText),
    finalGradeChar: tds[23].innerText,
    level: tds[24].innerText,
    description: tds[25].innerText,
    disable,
  };

  return subject;
};

const getOneRowOverview = (tr, isNumber) => {
  let tds = tr.querySelectorAll("td");

  const element1 = tds[0].querySelector("span:last-child");
  const element2 = tds[1].querySelector("span:last-child");

  const value1 = isNumber
    ? convertGradeToNumber(element1?.textContent)
    : element1?.textContent;
  const value2 = isNumber
    ? convertGradeToNumber(element2?.textContent)
    : element2?.textContent;

  return [value1, value2];
};

const getOverviewsAndAsignKey = (tr, termId) => {
  const [avg10, avg4] = getOneRowOverview(tr, true);

  tr = tr.nextElementSibling;
  const [avgAccumulator10, avgAccumulator4] = getOneRowOverview(tr, true);

  tr = tr.nextElementSibling;
  const [totalCreditRegister, totalCreditAccumulator] = getOneRowOverview(
    tr,
    true
  );

  tr = tr.nextElementSibling;
  const [totalCreditPass, totalCreditFail] = getOneRowOverview(tr, true);

  tr = tr.nextElementSibling;
  const [levelAccumulator, levelTerm] = getOneRowOverview(tr, false);

  return {
    avg10,
    avg4,
    avgAccumulator10,
    avgAccumulator4,
    totalCreditRegister,
    totalCreditAccumulator,
    totalCreditPass,
    totalCreditFail,
    levelAccumulator,
    levelTerm,
  };
};

let listTermNameUpdate = [];
(async () => {
  const status = localStorage.getItem("statusToolTinhDiem");

  let terms = await crawGrades();
  chrome.storage.local.set({
    tinhDiemIUHTerms: terms,
    status: status,
    time: new Date().toLocaleString(),
  });
})();

// const grade = {
//         startRowIndex: 0,
//         term: String,
//         subjects: [
//             {
//                 index: 0,
//                 idClass: 1,
//                 name: 2,
//                 totalCredit: 3,
//                 creditPractical: 4,
//                 midTerm: 5,
//                 diligence: 6,
//                 theory1: 7,
//                 theory2: 8,
//                 theory3: 9,
//                 theory4: 10,
//                 theory5: 11,
//                 theory6: 12,
//                 theory7: 13,
//                 theory8: 14,
//                 theory9: 15,
//                 practical1: 16,
//                 practical2: 17,
//                 practical3: 18,
//                 practical4: 19,
//                 practical5: 20,
//                 endTerm: 21,
//                 finalGrade10: 22,
//                 finalGrade4: 23,
//                 finalGradeChar: 24,
//                 level: 25,
//                 description: 26,
//                 rowIndex: 1,
//                 disable:false
//             }
//         ]
//         overview:{
//             avg10: number;
//             avg4: number;
//             avgAccumulator10: number;
//             avgAccumulator4: number;
//             totalCreditRegister: number;
//             totalCreditAccumulator: number;
//             totalCreditPass: number;
//             totalCreditFail: number;
//             levelAccumulator: String;
//             levelTerm: String;
//         }
// }
