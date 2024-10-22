export function convertOverviewSubjectToGrade10(result: number) {
  if (result >= 9) {
    return {
      finalGrade10: result,
      finalGrade4: 4.0,
      finalGradeChar: "A+",
      level: "Xuất sắc",
    };
  }
  if (result >= 8.5) {
    return {
      finalGrade10: result,
      finalGrade4: 3.8,
      finalGradeChar: "A",
      level: "Giỏi",
    };
  }
  if (result >= 8.0) {
    return {
      finalGrade10: result,
      finalGrade4: 3.5,
      finalGradeChar: "B+",
      level: "Khá",
    };
  }
  if (result >= 7.0) {
    return {
      finalGrade10: result,
      finalGrade4: 3.0,
      finalGradeChar: "B",
      level: "Khá",
    };
  }
  if (result >= 6.0) {
    return {
      finalGrade10: result,
      finalGrade4: 2.5,
      finalGradeChar: "C+",
      level: "Trung bình",
    };
  }
  if (result >= 5.5) {
    return {
      finalGrade10: result,
      finalGrade4: 2.0,
      finalGradeChar: "C",
      level: "Trung Binh",
    };
  }
  if (result >= 5.0) {
    return {
      finalGrade10: result,
      finalGrade4: 1.5,
      finalGradeChar: "D+",
      level: "Trung Bình yếu",
    };
  }
  if (result >= 4.0) {
    return {
      finalGrade10: result,
      finalGrade4: 1.0,
      finalGradeChar: "D",
      level: "Trung bình yếu",
    };
  }
  return {
    finalGrade10: result,
    finalGrade4: 0,
    finalGradeChar: "F",
    level: "Kém",
  };
}

export function findOverTermLevelByGrade4(grade4: number) {
  if (grade4 >= 3.6) return "Xuất sắc";
  if (grade4 >= 3.2) return "Giỏi";
  if (grade4 >= 2.5) return "Khá";
  if (grade4 >= 2) return "Trung bình";
  if (grade4 >= 1) return "Trung bình yếu";
  return "Kém";
}

export const fixedGrade = (grade: number | undefined | null, toFixed = 2) => {
  if (grade == undefined || isNaN(grade)) return null;
  return Math.round(grade * 10 ** toFixed) / 10 ** toFixed;
};
