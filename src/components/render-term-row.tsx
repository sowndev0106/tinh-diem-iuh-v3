import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useMemo } from 'react';
import { fixedGrade } from '../helper';
import { calcOverviewSubject, calculatorOverviewTerm } from '../helper/caculator';
import { KeySubjectGrade, Overview, Subject, Term } from '../interface';
import InputGrade from './InputGrade';
import TextCell from './TextCell';

const RenderRowSubject = ({ subject, index, updateTerm }: { subject: Subject, index: number, updateTerm: (grade: number | null | undefined, key: KeySubjectGrade, indexSubject: number) => void }) => {
    return (
        <TableRow hover>
            <TableCell align='center'>
                <TextCell>
                    {subject?.index}
                </TextCell>
            </TableCell>

            <TableCell align='left'>
                <TextCell>
                    {subject?.name}
                </TextCell>
            </TableCell>

            <TableCell align='center'   >
                <InputGrade
                    value={subject?.creditPractical}
                    inputType='Credit' max={subject.totalCredit}
                    onChange={(grade) => updateTerm(grade, "creditPractical", index)} />
            </TableCell>

            <TableCell align='center'>
                {subject?.totalCredit}
            </TableCell>

            <TableCell align='center'>
                <InputGrade
                    value={subject?.midTerm}
                    inputType='Grade'
                    onChange={(grade) => updateTerm(grade, "midTerm", index)} />
            </TableCell>

            <TableCell align='center'>
                <InputGrade
                    value={subject?.theory1}
                    inputType='Grade'
                    onChange={(grade) => updateTerm(grade, "theory1", index)} />
            </TableCell>

            <TableCell align='center'>
                <InputGrade
                    value={subject?.theory2}
                    inputType='Grade'
                    onChange={(grade) => updateTerm(grade, "theory2", index)} />
            </TableCell>

            <TableCell align='center'>
                <InputGrade
                    value={subject?.theory3}
                    inputType='Grade'
                    onChange={(grade) => updateTerm(grade, "theory3", index)} />
            </TableCell>

            <TableCell align='center'>
                <InputGrade
                    value={subject?.theory4}
                    inputType='Grade'
                    onChange={(grade) => updateTerm(grade, "theory4", index)} />
            </TableCell>

            <TableCell align='center'>
                <InputGrade
                    value={subject?.theory5}
                    inputType='Grade'
                    onChange={(grade) => updateTerm(grade, "theory5", index)} />
            </TableCell>

            <TableCell align='center'>
                <InputGrade
                    value={subject?.theory6}
                    inputType='Grade'
                    onChange={(grade) => updateTerm(grade, "theory6", index)} />
            </TableCell>

            <TableCell align='center'>
                <InputGrade
                    value={subject?.theory7}
                    inputType='Grade'
                    onChange={(grade) => updateTerm(grade, "theory7", index)} />
            </TableCell>

            <TableCell align='center'>
                <InputGrade
                    value={subject?.theory8}
                    inputType='Grade'
                    onChange={(grade) => updateTerm(grade, "theory8", index)} />
            </TableCell>

            <TableCell align='center'>
                <InputGrade
                    value={subject?.theory9}
                    inputType='Grade'
                    onChange={(grade) => updateTerm(grade, "theory9", index)} />
            </TableCell>

            <TableCell align='center'>
                <InputGrade
                    value={subject?.practical1}
                    inputType='Grade'
                    onChange={(grade) => updateTerm(grade, "practical1", index)} />
            </TableCell>

            <TableCell align='center'>
                <InputGrade
                    value={subject?.practical2}
                    inputType='Grade'
                    onChange={(grade) => updateTerm(grade, "practical2", index)} />
            </TableCell>

            <TableCell align='center'>

                <InputGrade
                    value={subject?.practical3}
                    inputType='Grade'
                    onChange={(grade) => updateTerm(grade, "practical3", index)} />
            </TableCell>

            <TableCell align='center'>
                <InputGrade
                    value={subject?.practical4}
                    inputType='Grade'
                    onChange={(grade) => updateTerm(grade, "practical4", index)} />
            </TableCell>

            <TableCell align='center'>
                <InputGrade
                    value={subject?.practical5}
                    inputType='Grade'
                    onChange={(grade) => updateTerm(grade, "practical5", index)} />
            </TableCell>

            <TableCell align='center'>
                <InputGrade
                    value={subject?.endTerm}
                    inputType='Grade'
                    onChange={(grade) => updateTerm(grade, "endTerm", index)} />
            </TableCell>

            <TableCell align='center'>
                <TextCell type='Grade'>
                    {subject?.finalGrade10}
                </TextCell>
            </TableCell>

            <TableCell align='center'>
                <TextCell>
                    {subject?.finalGrade4}
                </TextCell>
            </TableCell>

            <TableCell align='center'>
                <TextCell>
                    {subject?.finalGradeChar}
                </TextCell>

            </TableCell>

            <TableCell align='center'>
                <TextCell>
                    {subject?.description}
                </TextCell>
            </TableCell>

        </TableRow >
    );
};

const RenderRowTermLabel = ({ title }: { title: string }) => {
    return (
        <>
            <TableRow key={title} hover style={{ backgroundColor: "#f5f5f5", margin: "20px" }}>
                <TableCell />
                <TableCell colSpan={25} align="left" >
                    <TextCell>
                        <div style={{ color: "#1da1f2", fontWeight: "bold" }}>
                            {title}
                        </div>
                    </TextCell>
                </TableCell>
            </TableRow>
        </>
    )
}

const RenderRowOverview = ({ overview }: { overview: Overview }) => {
    return (
        <>
            <TableRow hover>
                <TableCell rowSpan={5} />
                <TableCell colSpan={2} align="left">
                    <TextCell>
                        Điểm trung bình học kỳ hệ 10: <strong>{fixedGrade(overview?.avg10, 1)}</strong>
                    </TextCell>
                </TableCell>
                <TableCell colSpan={16} align="left">
                    <TextCell>
                        Điểm trung bình học kỳ hệ 4: <strong>{fixedGrade(overview?.avg4)}</strong>
                    </TextCell>
                </TableCell>
            </TableRow>

            <TableRow hover>
                <TableCell colSpan={2} align="left">
                    <TextCell>
                        Điểm trung bình tích lũy: <strong>{fixedGrade(overview?.avgAccumulator10, 1)}</strong>
                    </TextCell>
                </TableCell>
                <TableCell colSpan={16} align="left">
                    <TextCell>
                        Điểm trung bình tích lũy (hệ 4): <strong> {fixedGrade(overview?.avgAccumulator4)}</strong>
                    </TextCell>
                </TableCell>
            </TableRow>

            <TableRow hover>
                <TableCell colSpan={2} align="left">
                    <TextCell>
                        Tổng số tín chỉ đã đăng ký: <strong>{overview?.totalCreditRegister ? overview?.totalCreditRegister : ""} </strong>
                    </TextCell>
                </TableCell>
                <TableCell colSpan={16} align="left">
                    <TextCell>
                        Tổng số tín chỉ tích lũy: <strong> {overview?.totalCreditAccumulator}</strong>
                    </TextCell>
                </TableCell>
            </TableRow>

            <TableRow hover>
                <TableCell colSpan={2} align="left">
                    <TextCell>
                        Tổng số tín chỉ đạt: <strong>{overview?.totalCreditPass}</strong>
                    </TextCell>
                </TableCell>
                <TableCell colSpan={16} align="left">
                    <TextCell>
                        Tổng số tín chỉ nợ tính đến hiện tại: <strong>{overview?.totalCreditFail}</strong>
                    </TextCell>
                </TableCell>
            </TableRow>

            <TableRow hover>
                <TableCell colSpan={2} align="left">
                    <TextCell>
                        Xếp loại học lực tích lũy: <strong>{overview?.levelAccumulator}</strong>
                    </TextCell>
                </TableCell>
                <TableCell colSpan={16} align="left">
                    <TextCell>
                        Xếp loại học lực học kỳ: <strong>{overview?.levelTerm}</strong>
                    </TextCell>
                </TableCell>
            </TableRow>

        </>
    )
}

const RenderTermRow = ({ term, onChange }: { term: Term, onChange: (term: Term) => void, isLast?: boolean }) => {
    const updateTerm = (grade: number | null | undefined, key: KeySubjectGrade, indexSubject: number) => {
        console.log("updateTerm", grade, key, indexSubject);
        if (key == undefined) return;
        let newTerm = { ...term };
        newTerm.subjects[indexSubject][key] = grade ? grade : null;
        newTerm.subjects[indexSubject] = calcOverviewSubject(newTerm.subjects[indexSubject]);
        newTerm.overview = calculatorOverviewTerm(newTerm);
        onChange(newTerm);
    }

    const termMemo = useMemo(() => {
        return <>
            <RenderRowTermLabel title={term.term} />
            {
                term.subjects.map((subject, index) => {
                    return RenderRowSubject({ subject, index, updateTerm });
                })
            }
            <RenderRowOverview overview={term.overview} />
        </>
    }, [term, term.subjects, term.overview]);

    return (
        <>
            {termMemo}
        </>
    );
};


export default RenderTermRow;