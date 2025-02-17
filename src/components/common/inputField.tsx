import React from 'react';

interface InputFieldProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    type?: string;
    placeholder?: string;
    error?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
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
}) => {
    return (
        <div style={{ marginBottom: '1rem', ...style }}>
            {label && <label className="block text-900 text-xl font-medium mb-2">{label}</label>}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`p-inputtext ${error ? 'p-invalid' : ''}`}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px' }}
                disabled={disabled}
            />
            {(error && value.length > 0) && <small className="p-error">{error}</small>}
        </div>
    );
};

export default InputField;
