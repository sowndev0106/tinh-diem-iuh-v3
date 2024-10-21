import { Table, TableProps } from "antd";
import { Grade, RowGrade, Subject } from "../interface";
import style from "./grades-table.module.less";
const sharedOnCell = (record: RowGrade, index?: number) => {
   
    return {
        
    };
  };
  

const columns: TableProps<RowGrade>['columns'] = [
    {
        title: "STT",
        dataIndex: "subject.index",
        key: "index",
        render: (text: any, record: any, index: number) => {
            if (record.type === "term-label") {
                return <strong>{record.value}</strong>
            }
            return text
        },
        onCell: (record: any, index?: number) => {
            if (record.type === "term-label") {
                return {
                    colSpan: 26,
                }
            }
            return {}
        }
    },
    {
        title: "Tên / Mã môn học",
        dataIndex: "subject.name",
        key: "name",
        onCell:sharedOnCell,
        fixed: "left",
        width: 200,

    },
    {
        title: "Số tín chỉ",
        dataIndex: "subject.totalCredit",
        key: "totalCredit",
        onCell:sharedOnCell,
        children: [
            {
                title: "LT",
                dataIndex: "subject.creditTheory",
                key: "creditTheory",
                onCell:sharedOnCell,
            },
            {
                title: "TH",
                dataIndex: "subject.creditPractical",
                key: "creditPractical",
                onCell:sharedOnCell,
            },
        ]
    },
    {
        title: "Giữa kỳ",
        dataIndex: "subject.creditPractical",
        key: "midTerm",
        onCell:sharedOnCell,
    },
    {
        title: "Thường xuyên",
        children: [
            {
                title: "LT Hệ số 1",
                children: [
                    {
                        title: "1",
                        dataIndex: "subject.theory1",
                        key: "theory1",
                        onCell:sharedOnCell,
                    },
                    {
                        title: "2",
                        dataIndex: "subject.theory2",
                        key: "theory2",
                        onCell:sharedOnCell,
                    },
                    {
                        title: "3",
                        dataIndex: "subject.theory3",
                        key: "theory3",
                        onCell:sharedOnCell,
                    },
                    {
                        title: "4",
                        dataIndex: "subject.theory4",
                        key: "theory4",
                        onCell:sharedOnCell,
                    },
                    {
                        title: "5",
                        dataIndex: "subject.theory5",
                        key: "theory5",
                        onCell:sharedOnCell,
                    }, {
                        title: "6",
                        dataIndex: "subject.theory6",
                        key: "theory6",
                        onCell:sharedOnCell,
                    },
                    {
                        title: "7",
                        dataIndex: "subject.theory7",
                        key: "theory7",
                        onCell:sharedOnCell,
                    },
                    {
                        title: "8",
                        dataIndex: "subject.theory8",
                        key: "theory8",
                        onCell:sharedOnCell,
                    },
                    {
                        title: "9",
                        dataIndex: "subject.theory9",
                        key: "theory9",
                        onCell:sharedOnCell,
                    }
                ]
            }
        ]
    },

    {
        title: "Thực hành",
        children: [
            {
                title: "1",
                dataIndex: "subject.practical1",
                key: "practical1",
                onCell:sharedOnCell,
            },
            {
                title: "2",
                dataIndex: "subject.practical2",
                key: "practical2",
                onCell:sharedOnCell,
            },
            {
                title: "3",
                dataIndex: "subject.practical3",
                key: "practical3",
                onCell:sharedOnCell,
            },
            {
                title: "4",
                dataIndex: "subject.practical4",
                key: "practical4",
                onCell:sharedOnCell,
            },
            {
                title: "5",
                dataIndex: "subject.practical5",
                key: "practical5",
                onCell:sharedOnCell,
            }
        ]
    },
    {
        title: "Cuối kỳ",
        dataIndex: "subject.endTerm",
        key: "endTerm",
        onCell:sharedOnCell,
    },
    {
        title: "Điểm tổng kết",
        dataIndex: "subject.finalGrade10",
        key: "finalGrade10",
        onCell:sharedOnCell,
    },
    {
        title: "Thang điểm 4",
        dataIndex: "subject.finalGrade4",
        key: "finalGrade4",
        onCell:sharedOnCell,
    },
    {
        title: "Điểm chữ",
        dataIndex: "subject.finalGradeChar",
        key: "finalGradeChar",
        onCell:sharedOnCell,
    },
    {
        title: "Xếp loại",
        dataIndex: "subject.finalGradeChar",
        key: "finalGradeChar",
        onCell:sharedOnCell,
    },
    {
        title: "Ghi chú",
        dataIndex: "subject.description",
        key: "description",
        onCell:sharedOnCell,
    }
];
const GradesTable = ({ grades }: { grades: Grade[] }) => {
    const dataSource :RowGrade[]= grades.map((term) => {
        const children :RowGrade[]= term.subjects.map((subject, index) => ({
            type: "subject",
            subject: subject,
        }))
        children.push({
            type: "overview",
            key: `${term.term}`,

        })
        let rows: RowGrade = {
            type: "term-label",
            children
        }
        return rows
    }
    );

    return (
        <div  className={style.gradeTable} style={{
            fontSize: "12px",
        }}>
            <Table columns={columns} dataSource={dataSource} pagination={false} bordered scroll={{ y: "100vh" }} />
        </div >
    );
};

export default GradesTable;
