import React, { useState, useEffect } from 'react';
import Topbar from './topbar';

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check if scrolled past threshold
      setIsScrolled(currentScrollY > 50);
      
      // Show/hide header based on scroll direction
      if (currentScrollY > lastScrollY) {
        setShowHeader(false); // Scrolling down
      } else {
        setShowHeader(true); // Scrolling up
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const renderDropdownMenu = (menu: string, items: { label: string; href: string }[]) => (
    <div
      style={{ backgroundColor: '#101013', width: '150px', textAlign: 'center' }}
      className={`
        absolute left-0 mt-2 w-48 rounded-lg 
        bg-dark-2/95 backdrop-blur-sm
        border border-primary/20
        shadow-[0_8px_30px_rgb(0,0,0,0.12)]
        transform transition-all duration-300 ease-in-out
        ${activeDropdown === menu ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
      `}
    >
      <div className="py-2">
        {items.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="
              block px-4 py-2 text-sm text-white 
              hover:bg-primary/10 hover:text-primary
              border-l-2 border-transparent
              hover:border-primary
              transition-all duration-200 ease-in-out
            "
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );

  const menuItems = {
    services: [
      { label: 'Device Repair', href: '/services/repair' },
      { label: 'Data Recovery', href: '/services/data-recovery' },
      { label: 'Virus Removal', href: '/services/virus-removal' },
      { label: 'Network Setup', href: '/services/network' }
    ],
    sell: [
      { label: 'Sell Your Device', href: '/sell/device' },
      { label: 'Trade-In Program', href: '/sell/trade-in' },
      { label: 'Bulk Selling', href: '/sell/bulk' }
    ],
    support: [
      { label: 'Help Center', href: '/support/help' },
      { label: 'Contact Us', href: '/support/contact' },
      { label: 'FAQs', href: '/support/faqs' },
      { label: 'Live Chat', href: '/support/chat' }
    ]
  };

  return (
    <>
      <Topbar />
      <div
        className={`
          fixed left-0 w-full z-40 transition-all duration-300 ease-in-out
          ${isScrolled ? 'top-0 bg-dark/90 backdrop-blur-xl shadow-lg' : 'top-10 bg-dark'}
          ${showHeader ? 'translate-y-0' : '-translate-y-full'}
          nav-bg
        `}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="max-w-full px-4 sm-hidden">
              <a href="index.html" className="navbar-logo block w-full py-5">
                <img src="/images/logo/logo.svg" alt="logo" className="header-logo w-full" />
              </a>
            </div>
            <div className="flex sm-row-dir w-full items-center justify-between px-4 relative z-40">
              <div className="">
                <button
                  id="navbarToggler"
                  className="right-4 menumt top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                >
                  <span className="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
                  <span className="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
                  <span className="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
                </button>
                <nav
                  id="navbarCollapse"
                  className={`
                    absolute right-0 z-40 top-full mx-auto hidden w-full rounded-lg py-5 
                    shadow-lg dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full 
                    lg:bg-transparent lg:px-4 lg:py-0 lg:shadow-none dark:lg:bg-transparent xl:px-6 sm-menu
                    ${isScrolled ? 'backdrop-blur-xl' : ''}
                  `}
                >
                  <ul className="blcok lg:flex topNav">
                    <li className="group relative">
                      <button
                        onClick={() => toggleDropdown('services')}
                        className="ud-menu-scroll family-poppins flex text-base font-normal text-white group-hover:text-primary dark:text-white lg:mr-0 lg:inline-flex lg:px-0 lg:text-grey-200 lg:group-hover:text-blue lg:group-hover:opacity-70"
                      >
                        Services
                        <img
                          className={`ml-2 transform transition-transform duration-300 ${activeDropdown === 'services' ? 'rotate-180' : ''}`}
                          src="/images/logo/nav-down.svg"
                          alt="dropdown"
                        />
                      </button>
                      {renderDropdownMenu('services', menuItems.services)}
                    </li>
                    <li className="group relative">
                      <a
                        href="#"
                        className="ud-menu-scroll family-poppins flex text-base font-normal text-white group-hover:text-primary dark:text-white lg:ml-7 lg:mr-0 lg:inline-flex lg:px-0 lg:text-gray-7 lg:group-hover:text-blue lg:group-hover:opacity-70 xl:ml-10"
                      >
                        Shop
                      </a>
                    </li>
                    <li className="group relative">
                      <button
                        onClick={() => toggleDropdown('sell')}
                        className="ud-menu-scroll family-poppins flex text-base font-normal text-white group-hover:text-primary dark:text-white lg:ml-7 lg:mr-0 lg:inline-flex lg:px-0 lg:text-gray-7 lg:group-hover:text-blue lg:group-hover:opacity-70 xl:ml-10"
                      >
                        Sell
                        <img
                          className={`ml-2 transform transition-transform duration-300 ${activeDropdown === 'sell' ? 'rotate-180' : ''}`}
                          src="/images/logo/nav-down.svg"
                          alt="dropdown"
                        />
                      </button>
                      {renderDropdownMenu('sell', menuItems.sell)}
                    </li>
                    <li className="group relative">
                      <a
                        href="#"
                        className="ud-menu-scroll family-poppins flex text-base font-normal text-white group-hover:text-primary dark:text-white lg:ml-7 lg:mr-0 lg:inline-flex lg:px-0 lg:text-gray-7 lg:group-hover:text-blue lg:group-hover:opacity-70 xl:ml-10"
                      >
                        Plans
                      </a>
                    </li>
                    <li className="group relative">
                      <a
                        href="#"
                        className="ud-menu-scroll family-poppins flex text-base font-normal text-white group-hover:text-primary dark:text-white lg:ml-7 lg:mr-0 lg:inline-flex lg:px-0 lg:text-gray-7 lg:group-hover:text-blue lg:group-hover:opacity-70 xl:ml-10"
                      >
                        Compare
                      </a>
                    </li>
                    <li className="group relative">
                      <a
                        href="#"
                        className="ud-menu-scroll family-poppins flex text-base font-normal text-white group-hover:text-primary dark:text-white lg:ml-7 lg:mr-0 lg:inline-flex lg:px-0 lg:text-gray-7 lg:group-hover:text-blue lg:group-hover:opacity-70 xl:ml-10"
                      >
                        Memberships
                      </a>
                    </li>
                    <li className="group relative">
                      <button
                        onClick={() => toggleDropdown('support')}
                        className="ud-menu-scroll family-poppins flex text-base font-normal text-white group-hover:text-primary dark:text-white lg:ml-7 lg:mr-0 lg:inline-flex lg:px-0 lg:text-gray-7 lg:group-hover:text-blue lg:group-hover:opacity-70 xl:ml-10"
                      >
                        Support
                        <img
                          className={`ml-2 transform transition-transform duration-300 ${activeDropdown === 'support' ? 'rotate-180' : ''}`}
                          src="/images/logo/nav-down.svg"
                          alt="dropdown"
                        />
                      </button>
                      {renderDropdownMenu('support', menuItems.support)}
                    </li>
                  </ul>
                </nav>
              </div>
              <a href="index.html" className="navbar-logo block py-5 lg-none">
                <img
                  src="/images/logo/logo.svg"
                  alt="logo"
                  className="header-logo"
                />
              </a>

              <div className="flex items-center justify-end sm-none">
                <div className="mobileNav">
                  <a
                    href="signup.html"
                    className="signUpBtn rounded-full hover:btn-gradient sm-btn-size family-poppins btn-gradient px-6 py-3 text-base font-semibold text-white mr-3 duration-300 ease-in-out hover:bg-opacity-100 hover:text-dark"
                  >
                    Get Immediate Assistance
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header;
