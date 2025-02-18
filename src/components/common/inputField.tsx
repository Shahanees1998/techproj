import React from 'react';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext"
interface InputFieldProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    type?: string;
    placeholder?: string;
    error?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    isMandatory?: boolean;
    iconPosition?: 'left' | 'right';
    icon?: React.ReactNode | string;
    borderColor?: string;
}

const InputField: React.FC<InputFieldProps> = ({
    value,
    onChange,
    label,
    type = 'text',
    placeholder,
    error,
    style,
    disabled = false,
    isMandatory = false,
    iconPosition,
    icon,
    borderColor = '#6366F1',
}) => {
    return (
        <div style={{ marginBottom: '1rem', ...style }}>
            {label &&
                <label className="text-800 font-thin text-sm">{label} {isMandatory && <span className="text-red-500">*</span>}</label>}
            <IconField iconPosition={iconPosition}>
                {icon && typeof icon === 'string' && <InputIcon style={{ marginTop: '-2px' }} className={`pi ${icon}`}></InputIcon>}
                <InputText
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`p-inputtext mt-2 w-full ${error ? 'p-invalid' : ''}`}
                    style={{ borderRadius: '10px', padding: '0.85rem', borderColor: borderColor }}
                    disabled={disabled}
                />
            </IconField>
            {(error && value.length > 0) && <small className="p-error">{error}</small>}


        </div>
    );
};

export default InputField;
