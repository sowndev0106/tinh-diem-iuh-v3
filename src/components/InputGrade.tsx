import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { fixedGrade } from '../helper';
import { Grade, Overview, Subject } from '../interface';
import { InputBase, InputBaseProps } from '@mui/material';
import style from './input-grade.module.sass';
export interface IInputGradeProps extends InputBaseProps {
    inputType: "Credit" | "Grade" | "EndTerm" | "FinalGrade10" | "FinalGrade4" | "FinalGradeChar" | "Description";
    min?: number;
    max?: number;
}

const InputGrade = (props: IInputGradeProps) => {
    const conditionProps: InputBaseProps = {}
    if (props.inputType === "Credit") {

    }
    return (
        <div className={style.inputGrade}>
            <InputBase {...props} type='number' />
        </div>
    );
};

export default InputGrade;