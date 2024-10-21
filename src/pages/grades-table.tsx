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
import RenderTermRow from '../components/render-term-row';
const TableHeadCustom = () => {
  return (<TableHead>
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
  )
}

const GradesTable = ({ grades }: { grades: Grade[] }) => {
  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer className={style['gradeTable']} sx={{ maxHeight: "100vh" }}>
        <Table stickyHeader aria-label="sticky table" sx={{ borderCollapse: "collapse" }} >

          <TableHeadCustom />
          <TableBody>
            {
              grades.map((grade, index) => {
                return <RenderTermRow grade={grade} />
              })
            }
          </TableBody>

        </Table >
      </TableContainer >
    </Paper >
  );
};

export default GradesTable;