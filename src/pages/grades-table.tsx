import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Grade, RowGrade, Subject } from '../interface';
import style from './grades-table.module.less';
import { makeStyles, Tooltip } from '@mui/material';
import { fixedGrade } from '../helper';


const GradesTable = ({ grades }: { grades: Grade[] }) => {
  const renderCellContent = (value: any, record: RowGrade, index: number) => {
    if (record.type === 'term-label') {
      return <strong>{value}</strong>;
    }
    return value;
  };

  const renderRow = (row: RowGrade, rowIndex: number) => {
    if (row.type === 'term-label') {
      return (
        <>
          <TableRow key={rowIndex} hover style={{ backgroundColor: "#f5f5f5", margin: "20px" }}>
            <TableCell />
            <TableCell colSpan={25} align="left" >
              <strong style={{ color: "#578ebe" }}>{row.key}</strong>
            </TableCell>
          </TableRow>

        </>
      );
    }
    if (row.type === 'overview') {
      return (
        <>
          <TableRow key={rowIndex} hover>   <TableCell rowSpan={5} />
            <TableCell colSpan={2} align="left">
              Điểm trung bình học kỳ hệ 10: <strong>{fixedGrade(row.overview?.avg10, 1)}0</strong>
            </TableCell>
            <TableCell colSpan={2} align="left">
              Điểm trung bình học kỳ hệ 4: <strong> {fixedGrade(row.overview?.avg4)}</strong>
            </TableCell>
          </TableRow>

          <TableRow key={rowIndex} hover>
            <TableCell colSpan={2} align="left">
              Điểm trung bình tích lũy: <strong>{fixedGrade(row.overview?.avgAccumulator10, 1)}0</strong>
            </TableCell>
            <TableCell colSpan={2} align="left">
              Điểm trung bình tích lũy (hệ 4): <strong> {fixedGrade(row.overview?.avgAccumulator4)}</strong>
            </TableCell>
          </TableRow>

          <TableRow key={rowIndex} hover>
            <TableCell colSpan={2} align="left">
              Tổng số tín chỉ đã đăng ký: <strong>{row.overview?.totalCreditRegister ? row.overview?.totalCreditRegister : ""} </strong>
            </TableCell>
            <TableCell colSpan={2} align="left">
              Tổng số tín chỉ tích lũy: <strong> {row.overview?.totalCreditAccumulator}</strong>
            </TableCell>
          </TableRow>

          <TableRow key={rowIndex} hover>
            <TableCell colSpan={2} align="left">
              Tổng số tín chỉ đạt: <strong>{row.overview?.totalCreditPass}</strong>
            </TableCell>
            <TableCell colSpan={2} align="left">
              Tổng số tín chỉ nợ tính đến hiện tại: <strong> {row.overview?.totalCreditFail}</strong>
            </TableCell>
          </TableRow>

          <TableRow key={rowIndex} hover>
            <TableCell colSpan={2} align="left">
              Xếp loại học lực tích lũy: <strong>{row.overview?.levelAccumulator}</strong>
            </TableCell>
            <TableCell colSpan={2} align="left">
              Xếp loại học lực học kỳ: <strong> {row.overview?.levelTerm}</strong>
            </TableCell>
          </TableRow>
        </>
      );
    }

    return (
      <TableRow key={rowIndex} hover>
        <TableCell align='center'>{row.subject?.index}</TableCell>
        <TableCell align='left'>{row.subject?.name}</TableCell>
        <TableCell align='center'>{row.subject?.creditPractical}</TableCell>
        <TableCell align='center'>{row.subject?.totalCredit}</TableCell>
        <TableCell align='center'>{row.subject?.midTerm}</TableCell>
        <TableCell align='center'>{row.subject?.theory1}</TableCell>
        <TableCell align='center'>{row.subject?.theory2}</TableCell>
        <TableCell align='center'>{row.subject?.theory3}</TableCell>
        <TableCell align='center'>{row.subject?.theory4}</TableCell>
        <TableCell align='center'>{row.subject?.theory5}</TableCell>
        <TableCell align='center'>{row.subject?.theory6}</TableCell>
        <TableCell align='center'>{row.subject?.theory7}</TableCell>
        <TableCell align='center'>{row.subject?.theory8}</TableCell>
        <TableCell align='center'>{row.subject?.theory9}</TableCell>
        <TableCell align='center'>{row.subject?.practical1}</TableCell>
        <TableCell align='center'>{row.subject?.practical2}</TableCell>
        <TableCell align='center'>{row.subject?.practical3}</TableCell>
        <TableCell align='center'>{row.subject?.practical4}</TableCell>
        <TableCell align='center'>{row.subject?.practical5}</TableCell>
        <TableCell align='center'>{row.subject?.endTerm}</TableCell>
        <TableCell align='center'>{row.subject?.finalGrade10}</TableCell>
        <TableCell align='center'>{row.subject?.finalGrade4}</TableCell>
        <TableCell align='center'>{row.subject?.finalGradeChar}</TableCell>
        <TableCell align='center'>{row.subject?.description}</TableCell>
      </TableRow>
    );
  };

  const dataSource: RowGrade[] = grades.map((term) => {
    const children: RowGrade[] = term.subjects.map((subject, index) => ({
      type: 'subject',
      subject: subject,
    }));
    children.push({
      type: 'overview',
      overview: term.overview,
      key: `${term.term}`,
    });
    let rows: RowGrade = {
      type: 'term-label',
      key: term.term,
      children,
    };
    return rows;
  });

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer className={style['gradeTable']} sx={{ maxHeight: "100vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell rowSpan={2} align='center' >STT</TableCell>
              <TableCell rowSpan={2} align='center' >Tên / Mã môn học</TableCell>
              <TableCell colSpan={2} align='center' >Số tín chỉ</TableCell>

              <TableCell rowSpan={2} align='center' >Giữa kỳ</TableCell>
              <TableCell colSpan={9} align='center'>Lý thuyết Hệ số 1 (Thường xuyên)</TableCell>

              <TableCell colSpan={5} align='center' >Thực hành</TableCell>

              <TableCell rowSpan={2} align='center' >Cuối kỳ</TableCell>
              <TableCell rowSpan={2} align='center' >Điểm tổng kết</TableCell>
              <TableCell rowSpan={2} align='center' >Thang điểm 4</TableCell>
              <TableCell rowSpan={2} align='center' >Điểm chữ</TableCell>
              <TableCell rowSpan={2} align='center' >Ghi chú</TableCell>
            </TableRow>
            <TableRow>
              {/* credit */}
              <Tooltip title="Số tín chỉ thực hành">
                <TableCell style={{ top: 35 }} align='center' rowSpan={2} >Thực hành</TableCell>
              </Tooltip>
              <Tooltip title="Tổng số tín chỉ môn học">
                <TableCell style={{ top: 35 }} align='center' rowSpan={2} >Tổng</TableCell>
              </Tooltip>

              {/* Theory */}

              <TableCell style={{ top: 35 }} align='center'>1</TableCell>
              <TableCell style={{ top: 35 }} align='center'>2</TableCell>
              <TableCell style={{ top: 35 }} align='center'>3</TableCell>
              <TableCell style={{ top: 35 }} align='center'>4</TableCell>
              <TableCell style={{ top: 35 }} align='center'>5</TableCell>
              <TableCell style={{ top: 35 }} align='center'>6</TableCell>
              <TableCell style={{ top: 35 }} align='center'>7</TableCell>
              <TableCell style={{ top: 35 }} align='center'>8</TableCell>
              <TableCell style={{ top: 35 }} align='center'>9</TableCell>

              {/* Practice */}
              <TableCell style={{ top: 35 }} align='center'> 1</TableCell>
              <TableCell style={{ top: 35 }} align='center'> 2</TableCell>
              <TableCell style={{ top: 35 }} align='center'> 3</TableCell>
              <TableCell style={{ top: 35 }} align='center'> 4</TableCell>
              <TableCell style={{ top: 35 }} align='center'> 5</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataSource.map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>
                {renderRow(row, rowIndex)}
                {row.children?.map((child, childIndex) => renderRow(child, childIndex))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table >
      </TableContainer >
    </Paper >
  );
};

export default GradesTable;