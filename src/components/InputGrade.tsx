import { TextField, TextFieldProps, Tooltip } from '@mui/material';
import { useState } from 'react';
import style from './input-grade.module.sass';
import { TypeGrade } from '../interface';
export interface IInputGradeProps {
    inputType: "Credit" | "Grade"
    onChange: (grade: TypeGrade) => void;
    value?: TypeGrade;
    min?: TypeGrade;
    max?: TypeGrade;
}

const InputGrade = ({ ...props }: IInputGradeProps) => {
    const [error, setError] = useState<string | null>(null);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value?.trim();
        let value: number | null = rawValue === "" ? null : Number(rawValue);
        if (props.inputType === 'Credit') {
            if (value === null) {
                setError("Không được để trống số tín chỉ thực hành");
                return;
            }
            if (!Number.isInteger(value)) {
                setError("Số tín chỉ thực hành phải là số nguyên");
                return;
            }
        }

        const min = props.min ?? 0;
        const max = props.max ?? 10;

        if (value !== null && (value < min || value > max)) {
            setError(`${props.inputType === "Credit" ? "Tín chỉ thực hành" : "Điểm"} phải >= ${min} và <= ${max}`);
            return;
        }

        props.onChange(value);
        setError(null)
    };

    return (
        <>
            {!error ? <>
                <TextField className={`${style.inputGrade} `}
                    type='number'
                    value={props.value}
                    onChange={onChange}
                    sx={{
                        "& fieldset": { border: 'none' },
                        "& input": { textAlign: 'center' },
                    }}
                />
            </> : <>
                <Tooltip title={error}>
                    <TextField className={`${style.inputGrade} ${style.inputError}`}
                        type='number'
                        defaultValue={props.value}
                        onChange={onChange}
                        sx={{
                            "& fieldset": { border: 'none' },
                            "& input": { textAlign: 'center' },
                        }}
                    />
                </Tooltip>
            </>
            }
        </>
    );
};

export default InputGrade;