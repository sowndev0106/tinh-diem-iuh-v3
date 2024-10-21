import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { fixedGrade } from '../helper';
import { Grade, Overview, Subject } from '../interface';
import { InputBase } from '@mui/material';
import InputGrade from './InputGrade';


const RenderTermRow = ({ grade }: { grade: Grade }) => {
    const renderRowSubject = ({ subject }: { subject: Subject }) => {
        return (
            <TableRow hover>
                <TableCell align='center'>
                    <InputGrade defaultValue={subject?.index} inputType='Grade' />
                </TableCell>

                <TableCell align='left'>
                    {subject?.name}
                </TableCell>

                <TableCell align='center'   >
                    <InputGrade defaultValue={subject?.creditPractical} inputType='Grade' />
                </TableCell>

                <TableCell align='center'>
                    {subject?.totalCredit}
                </TableCell>

                <TableCell align='center'>
                    <InputGrade defaultValue={subject?.midTerm} inputType='Grade' />
                </TableCell>

                <TableCell align='center'>
                    <InputGrade defaultValue={subject?.theory1} inputType='Grade' />
                </TableCell>

                <TableCell align='center'>
                    <InputGrade defaultValue={subject?.theory2} inputType='Grade' />
                </TableCell>

                <TableCell align='center'>
                    <InputGrade defaultValue={subject?.theory3} inputType='Grade' />
                </TableCell>

                <TableCell align='center'>
                    <InputGrade defaultValue={subject?.theory4} inputType='Grade' />
                </TableCell>

                <TableCell align='center'>
                    <InputGrade defaultValue={subject?.theory5} inputType='Grade' />
                </TableCell>

                <TableCell align='center'>
                    <InputGrade defaultValue={subject?.theory6} inputType='Grade' />
                </TableCell>

                <TableCell align='center'>
                    <InputGrade defaultValue={subject?.theory7} inputType='Grade' />
                </TableCell>

                <TableCell align='center'>
                    <InputGrade defaultValue={subject?.theory8} inputType='Grade' />
                </TableCell>

                <TableCell align='center'>
                    <InputGrade defaultValue={subject?.theory9} inputType='Grade' />
                </TableCell>

                <TableCell align='center'>
                    <InputGrade defaultValue={subject?.practical1} inputType='Grade' />
                </TableCell>

                <TableCell align='center'>
                    <InputGrade defaultValue={subject?.practical2} inputType='Grade' />
                </TableCell>

                <TableCell align='center'>
                    <InputGrade defaultValue={subject?.practical3} inputType='Grade' />
                </TableCell>

                <TableCell align='center'>
                    <InputGrade defaultValue={subject?.practical4} inputType='Grade' />
                </TableCell>

                <TableCell align='center'>
                    <InputGrade defaultValue={subject?.practical5} inputType='Grade' />
                </TableCell>

                <TableCell align='center'>
                    <InputGrade defaultValue={subject?.endTerm} inputType='Grade' />
                </TableCell>

                <TableCell align='center'>
                    <InputGrade defaultValue={subject?.finalGrade10} inputType='Grade' />
                </TableCell>

                <TableCell align='center'>
                    <InputGrade defaultValue={subject?.finalGrade4} inputType='Grade' />
                </TableCell>

                <TableCell align='center'>
                    <InputGrade defaultValue={subject?.finalGradeChar} inputType='Grade' />
                </TableCell>

                <TableCell align='center'>
                    <InputGrade defaultValue={subject?.description} inputType='Grade' />
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
                        <strong style={{ color: "#578ebe" }}>{title}</strong>
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
                        Điểm trung bình học kỳ hệ 10: <strong>{fixedGrade(overview?.avg10, 1)}0</strong>
                    </TableCell>
                    <TableCell colSpan={2} align="left">
                        Điểm trung bình học kỳ hệ 4: <strong> {fixedGrade(overview?.avg4)}</strong>
                    </TableCell>
                </TableRow>

                <TableRow hover>
                    <TableCell colSpan={2} align="left">
                        Điểm trung bình tích lũy: <strong>{fixedGrade(overview?.avgAccumulator10, 1)}0</strong>
                    </TableCell>
                    <TableCell colSpan={2} align="left">
                        Điểm trung bình tích lũy (hệ 4): <strong> {fixedGrade(overview?.avgAccumulator4)}</strong>
                    </TableCell>
                </TableRow>

                <TableRow hover>
                    <TableCell colSpan={2} align="left">
                        Tổng số tín chỉ đã đăng ký: <strong>{overview?.totalCreditRegister ? overview?.totalCreditRegister : ""} </strong>
                    </TableCell>
                    <TableCell colSpan={2} align="left">
                        Tổng số tín chỉ tích lũy: <strong> {overview?.totalCreditAccumulator}</strong>
                    </TableCell>
                </TableRow>

                <TableRow hover>
                    <TableCell colSpan={2} align="left">
                        Tổng số tín chỉ đạt: <strong>{overview?.totalCreditPass}</strong>
                    </TableCell>
                    <TableCell colSpan={2} align="left">
                        Tổng số tín chỉ nợ tính đến hiện tại: <strong> {overview?.totalCreditFail}</strong>
                    </TableCell>
                </TableRow>

                <TableRow hover>
                    <TableCell colSpan={2} align="left">
                        Xếp loại học lực tích lũy: <strong>{overview?.levelAccumulator}</strong>
                    </TableCell>
                    <TableCell colSpan={2} align="left">
                        Xếp loại học lực học kỳ: <strong> {overview?.levelTerm}</strong>
                    </TableCell>
                </TableRow>

            </>
        )
    }

    return (
        <>
            <RenderRowTermLabel title={grade.term} />
            {
                grade.subjects.map((subject, index) => {
                    return renderRowSubject({ subject });
                })
            }
            <RenderRowOverview overview={grade.overview} />

        </>
    );
};


export default RenderTermRow;