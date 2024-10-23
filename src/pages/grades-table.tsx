import { Tooltip } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import RenderTermRow from '../components/render-term-row';
import { KeySubjectGrade, Term } from '../interface';
import style from './grades-table.module.sass';
import { useEffect, useMemo, useState } from 'react';
import { calcAccumulatorOverview } from '../helper/caculator';

const TableHeadCustom = () => {
  return (
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
      <TableRow style={{ border: " 1px solid rgba(224, 224, 224, 1) " }}>
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

const GradesTable = (data: { terms: Term[] }) => {
  const [terms, setTerms] = useState<Term[]>(data.terms);
  useEffect(() => {
    setTerms(data.terms)
  }, [data])

  const tableHeader = useMemo(() => {
    return TableHeadCustom();
  }, []);

  const onUpdateTerm = (term: Term, index: number) => {
    const newTerms = [...terms];
    newTerms[index] = term;
    for (let i = index; i < newTerms.length; i++) {
      const pervertTerm = i === 0 ? undefined : newTerms[i - 1];
      const old = newTerms[i].overview;
      newTerms[i].overview = calcAccumulatorOverview(newTerms[i], pervertTerm);
    }
    setTerms(newTerms);
  }

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer className={style['termTable']} sx={{ maxHeight: "100vh" }}>
        <Table stickyHeader aria-label="sticky table" sx={{ borderCollapse: "collapse" }} >
          {tableHeader}
          <TableBody>
            {
              terms.map((term, index) => {
                const isLast = index === terms.length - 1;
                return <RenderTermRow term={term} isLast={isLast} onChange={(term) => onUpdateTerm(term, index)} />
              })
            }
          </TableBody>
        </Table >
      </TableContainer >
    </Paper >
  );
};

export default GradesTable;