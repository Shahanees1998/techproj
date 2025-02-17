'use client';
import { LayoutProvider } from '../layout/context/layoutcontext';
import { PrimeReactProvider } from 'primereact/api';

import '../styles/layout/layout.scss';
import '../styles/demo/Demos.scss';

import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from '@/contexts/AuthContext';

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning style={{ fontSize: '14px' }}>
            <head>
                {/* <link id="theme-css" href={`/themes/lara-light-indigo/theme.css`} rel="stylesheet"></link> */}
            </head>
            <body>
                <AuthProvider>
                    <PrimeReactProvider>
                        <LayoutProvider>{children}</LayoutProvider>
                    </PrimeReactProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
