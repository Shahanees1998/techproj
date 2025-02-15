'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const VerifyPage = () => {
  const router = useRouter();
  const { verify } = useAuth();
  useEffect(() => {
    const verifyToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (token) {
        try {
          await verify(token)
        } catch (error) {
          console.error('Error verifying token:', error);
          router.push('/auth/error'); // Redirect to an error page
        }
      } else {
        router.push('/auth/error'); // Redirect if no token is found
      }
    };

    verifyToken();
  }, [router, verify]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-3xl font-bold">Verifying Your Magic Link</h1>
        <p className="text-gray-600">
          Please wait while we verify your magic link. This may take a few moments.
        </p>
        <div className="loader"></div> {/* You can add a loading spinner here */}
      </div>
    </div>
  );
};

export default VerifyPage;
