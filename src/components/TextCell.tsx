import { ReactNode } from 'react';
import style from './input-grade.module.sass';

interface TextCellProps {
    children?: ReactNode;
    type?: "Credit" | "Grade" | "Text";
}

const TextCell = ({ children, type = "Text" }: TextCellProps) => {
    function checkWarning(value: string) {
        if (value === 'F' || value === 'Kém') {
            return true;
        }
        if (type === 'Grade' && Number(value) < 5) {
            return true;
        }
    }
    console.log(children, checkWarning(String(children)))
    return (
        <div className={`${style.textCell} ${checkWarning(String(children)) ? style.lowGrade : ""}`}>
            {children}
        </div>
    );
};

export default TextCell;