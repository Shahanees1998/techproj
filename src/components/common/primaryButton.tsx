import React from 'react';
import { Button } from 'primereact/button';

interface CommonButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
}

const CommonButton: React.FC<CommonButtonProps> = ({ label, onClick, disabled = false, loading = false, className }) => {
    return (
        <Button 
            label={label} 
            onClick={onClick} 
            disabled={disabled} 
            loading={loading} 
            className={className} 
            style={{borderRadius: '20px'}}
        />
    );
};

export default CommonButton;
