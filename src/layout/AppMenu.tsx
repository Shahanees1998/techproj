/* eslint-disable @next/next/no-img-element */

import React from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import CommonButton from '@/components/common/primaryButton';

const AppMenu = () => {
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push('/auth/login');
    };

    const model: AppMenuItem[] = [
        {
            label: 'Menu',
            items: [
                { label: 'Jobs', icon: 'pi pi-fw pi-book', to: '/' },
                { label: 'Projects', icon: 'pi pi-fw pi-briefcase', to: '/projects' },
                { label: 'Clients', icon: 'pi pi-fw pi-home', to: '/clients' },
                { label: 'Users', icon: 'pi pi-fw pi-users', to: '/users' },
                { label: 'Schedules', icon: 'pi pi-fw pi-calendar', to: '/schedules' },
                { label: 'Payroll', icon: 'pi pi-fw pi-id-card', to: '/payroll' },
            ]
        }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
                <li>
                    <CommonButton 
                        label="Logout" 
                        onClick={handleLogout} 
                        className="logout-button" 
                    />
                </li>
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
