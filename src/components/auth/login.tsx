import React from 'react';
import CommonButton from '@/components/common/primaryButton';
import InputField from '../common/inputField';

// Define the props type
interface LoginUIProps {
    email: string;
    setEmail?: (email: string) => void;
    isLoading?: boolean;
    handleLogin?: () => void;
    isEmailValid?: (email: string) => boolean;
}

const LoginUI: React.FC<LoginUIProps> = ({ email, setEmail, isLoading = false, handleLogin = () => {}, isEmailValid = () => false }) => {
    return (
        <div className="flex flex-column w-full align-items-center justify-content-center px-4 md:px-0">
            <img src={`/images/common/logo.svg`} alt="Sakai logo" className="mb-5 flex-shrink-0" />
            <div className='container'>
                <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                    <div className="text-center mb-5">
                        <div className="text-900 text-3xl font-bold mb-3">Welcome to Strategeaze</div>
                        <span className="text-500 font-thin">Sign in with magic link</span>
                    </div>

                    <div>
                        <InputField
                            value={email}
                            onChange={(e) => setEmail?.(e.target.value)}
                            label="Email"
                            placeholder="example@example.com"
                            disabled={isLoading}
                            isMandatory={true}
                            icon={'pi-envelope'}
                            iconPosition="right"
                            error={!isEmailValid(email) ? 'Invalid email address' : undefined}
                        />
                        <CommonButton
                            label={isLoading ? "Loading..." : "Send Link"}
                            className={`w-full mt-4 text-sm rounded-full ${isLoading || !isEmailValid(email) ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={isEmailValid(email) ? handleLogin : () => { }}
                            disabled={isLoading || !isEmailValid(email)}
                        />
                        <div className='text-center mt-4'>
                            <span>{`We'll email you a magic code for a password-free sign in.`}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginUI;
