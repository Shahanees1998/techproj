import React, { useState, useEffect } from 'react';
import Topbar from './topbar';

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Disable scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
        style={{zIndex:"100000 !important", backdropFilter:isScrolled ? "blur(20px)" : "blur(0px)"}}
        className={`
          fixed left-0 w-full z-10 transition-all duration-300 ease-in-out
          ${isScrolled ? 'top-0 bg-dark/95 backdrop-blur-2xl shadow-lg' : 'top-10 bg-dark/95 backdrop-blur-2xl'}
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
                  onClick={toggleMobileMenu}
                  className="right-4 menumt top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                >
                  <span className="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
                  <span className="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
                  <span className="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
                </button>

                {/* Mobile Menu Overlay */}
                <div 
                  className={`
                    fixed inset-0 bg-dark/95 backdrop-blur-xl z-50
                    transition-all duration-300 ease-in-out
                    lg:hidden
                    ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
                  `}
                >
                  <div className='mobile-menu-overlay'>
                    {/* Close Button */}
                    <button 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="absolute top-6 right-6 text-white hover:text-primary transition-colors"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>

                    {/* Mobile Menu Content */}
                    <div className="h-full flex flex-col items-center pt-12">
                      <nav className="w-full px-6">
                        <ul className="space-y-8">
                          <li className="group relative">
                            <button
                              onClick={() => toggleDropdown('services')}
                              className="w-full text-left text-xl font-medium text-white hover:text-primary transition-colors"
                            >
                              Services
                              <img
                                className={`ml-2 inline-block transform transition-transform duration-300 ${activeDropdown === 'services' ? 'rotate-180' : ''}`}
                                src="/images/logo/nav-down.svg"
                                alt="dropdown"
                              />
                            </button>
                            {activeDropdown === 'services' && (
                              <div className="mt-4 space-y-4 pl-4">
                                {menuItems.services.map((item, index) => (
                                  <a
                                    key={index}
                                    href={item.href}
                                    className="block text-lg text-white hover:text-primary transition-colors"
                                  >
                                    {item.label}
                                  </a>
                                ))}
                              </div>
                            )}
                          </li>
                          <li>
                            <a href="#" className="block text-xl font-medium text-white hover:text-primary transition-colors">
                              Shop
                            </a>
                          </li>
                          <li className="group relative">
                            <button
                              onClick={() => toggleDropdown('sell')}
                              className="w-full text-left text-xl font-medium text-white hover:text-primary transition-colors"
                            >
                              Sell
                              <img
                                className={`ml-2 inline-block transform transition-transform duration-300 ${activeDropdown === 'sell' ? 'rotate-180' : ''}`}
                                src="/images/logo/nav-down.svg"
                                alt="dropdown"
                              />
                            </button>
                            {activeDropdown === 'sell' && (
                              <div className="mt-4 space-y-4 pl-4">
                                {menuItems.sell.map((item, index) => (
                                  <a
                                    key={index}
                                    href={item.href}
                                    className="block text-lg text-white hover:text-primary transition-colors"
                                  >
                                    {item.label}
                                  </a>
                                ))}
                              </div>
                            )}
                          </li>
                          <li>
                            <a href="#" className="block text-xl font-medium text-white hover:text-primary transition-colors">
                              Plans
                            </a>
                          </li>
                          <li>
                            <a href="#" className="block text-xl font-medium text-white hover:text-primary transition-colors">
                              Compare
                            </a>
                          </li>
                          <li>
                            <a href="#" className="block text-xl font-medium text-white hover:text-primary transition-colors">
                              Memberships
                            </a>
                          </li>
                          <li className="group relative">
                            <button
                              onClick={() => toggleDropdown('support')}
                              className="w-full text-left text-xl font-medium text-white hover:text-primary transition-colors"
                            >
                              Support
                              <img
                                className={`ml-2 inline-block transform transition-transform duration-300 ${activeDropdown === 'support' ? 'rotate-180' : ''}`}
                                src="/images/logo/nav-down.svg"
                                alt="dropdown"
                              />
                            </button>
                            {activeDropdown === 'support' && (
                              <div className="mt-4 space-y-4 pl-4">
                                {menuItems.support.map((item, index) => (
                                  <a
                                    key={index}
                                    href={item.href}
                                    className="block text-lg text-white hover:text-primary transition-colors"
                                  >
                                    {item.label}
                                  </a>
                                ))}
                              </div>
                            )}
                          </li>
                        </ul>
                      </nav>
                      <div className="mt-8 px-6">
                        <a
                          href="signup.html"
                          className="block w-full text-center rounded-full hover:btn-gradient family-poppins btn-gradient px-6 py-3 text-base font-semibold text-white duration-300 ease-in-out hover:bg-opacity-100 hover:text-dark"
                        >
                          Get Immediate Assistance
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

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
                  style={{width:"150px"}}
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
