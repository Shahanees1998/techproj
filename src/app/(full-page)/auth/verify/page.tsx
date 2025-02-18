'use client';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { classNames } from 'primereact/utils';
import LoginUI from '@/components/auth/login';
import { LayoutContext } from '@/layout/context/layoutcontext';

const VerifyPage = () => {
  const router = useRouter();
  const { layoutConfig } = useContext(LayoutContext);
  const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

  const { verify } = useAuth();
  useEffect(() => {
    const verifyToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (token) {
        try {
          await verify(token);
        } catch (error) {
          const axiosError = error as AxiosError<{ error: string }>;
          const errorMessage = axiosError.message || 'An unknown error occurred.';
          toast.error(errorMessage);
          setTimeout(() => router.push('/auth/login'), 5000);
        }
      } else {
        router.push('/auth/login');
      }
    };

    verifyToken();
  }, [router, verify]);

  return (
    <div className={`${containerClassName || ''} w-full max-w-4xl`}>

      <ToastContainer />
      <div className="fixed top-0 left-0 right-0 bottom-0 inset-0 z-40 w-full h-full"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 9, backdropFilter: 'blur(5px)' }}
      >
        <div className="flex flex-col mt-24 items-center justify-center w-full h-full p-4">
          <div className="w-full h-full space-y-8 text-center" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <h1 className="text-3xl text-white mt-12 font-bold">Verifying Your Magic Link</h1>
            <p style={{ color: 'white' }}>
              Please wait while we verify your magic link. This may take a few moments.
            </p>
            <i className="mt-4 pi pi-spin pi-spinner" style={{ fontSize: '3rem' , color: 'white' }}></i>
          </div>
        </div>
      </div>
      <LoginUI email={''} />
    </div>
  );
};

export default VerifyPage;
