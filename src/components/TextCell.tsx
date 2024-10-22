import { ReactNode } from 'react';
import style from './input-grade.module.sass';

interface TextCellProps {
    children?: ReactNode;
}

const TextCell = ({ children }: TextCellProps) => {
    return (
        <div className={style.textCell}>
            {children}
        </div>
    );
};

export default TextCell;