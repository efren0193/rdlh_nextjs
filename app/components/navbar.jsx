"use client"

import React, { useState, useEffect} from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { CldImage } from 'next-cloudinary';
import { MdBrightness2, MdBrightness7 } from "react-icons/md";
import Link from 'next/link';


const Navbar = ({servicios}) => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);
  const [top, setTop] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  if(pathname.startsWith('/invitaciones'))return null;

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  const closeNav = () => {
    setNav(false);
  };

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
    if (scrollPosition > 100) {
      setTop(true)
    } else {
      setTop(false)
    } 
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })


  const updateTheme = () => {
    if (theme === 'dark') {
      return setTheme('light');
    }
    return setTheme('dark');
  }

  // Array containing navigation items
  const navItems = [
    { id: 1, text: 'Inicio', href: '/' },
    { id: 2, text: 'Servicios', href:'/servicios', 
      submenu: servicios.map(s => ({
        id: s.id,
        href: `/servicios/${s.slug}`,
        name: s.name
      }))
    },
    { id: 3, text: 'Producciones', href:'/producciones' },
    // { id: 4, text: 'Nosotros', href:'/nosotros' },
    { id: 5, text: '', html: theme === 'dark'?<MdBrightness7 onClick={updateTheme}/> : <MdBrightness2 onClick={updateTheme} />},
  ];

  return (
    <div className={`w-full fixed z-10 ${top ? 'shadow-md bg-light dark:bg-black text-dark dark:text-primary':'shadow-none text-primary'}`}>
        <div className=' flex justify-between h-20 items-center px-4 sm:px-8 md:max-w-screen-md lg:max-w-screen-lg mx-auto '>
            {/* Logo */}
            <h1 className='w-full text-3xl font-bold'>
            <Link href={'/'}>
              <CldImage
                  width="100"
                  height="100"
                  src="rh_fb_pz9mbv"/>
            </Link>
            </h1>

            {/* Desktop Navigation */}
            <ul className='hidden md:flex'>
              {navItems.map(item => (
                <li
                  key={item.id}
                  className={`p-4 dark:hover:text-primary hover:text-secondaryDark  rounded-xl m-2 cursor-pointer flex items-center ${
                    item.submenu ? 'group relative' : ''
                  }`}
                >
                  {item.text ? (
                    <Link href={item.href} className="flex items-center
                    hover:border-b dark:hover:border-primary 
                      hover:border-secondary transition-all duration-200
                    ">
                      {item.text}
                      {item.submenu && (
                        <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      )}
                    </Link>
                  ) : (
                    item.html
                  )}
                  
                  {/* Submenú */}
                  {item.submenu && (
                    <div className={`absolute left-1/2 transform -translate-x-1/2 top-full hidden group-hover:block 
                    bg-light dark:bg-black shadow-xl rounded-md min-w-[250px] z-50 
                    transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0`}>
                      <ul className="py-2">
                        {item.submenu.map(subItem => (
                          <li key={subItem.id} className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                            <Link 
                              href={subItem.href} 
                              className="block w-full 
                               dark:hover:text-primary hover:border-b dark:hover:border-primary 
                              hover:border-secondary hover:text-secondaryDark transition-all duration-200"
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Mobile Navigation Icon */}
            <div className='block md:hidden mr-6 cursor-pointer'>
              {theme === 'dark'?<MdBrightness7 onClick={updateTheme}/> : <MdBrightness2 onClick={updateTheme} />}
            </div>
            <div onClick={handleNav} className='block md:hidden'>
                {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </div>

            {/* Mobile Navigation Menu */}
            <ul
                className={
                nav
                    ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-light dark:bg-dark  text-dark dark:text-primary ease-in-out duration-500'
                    : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
                }
            >
                {/* Mobile Logo */}
                <Link href={'/'} onClick={closeNav}>
                  <h1 className='w-full text-3xl font-bold m-4'>RH</h1>
                </Link>

                {/* Mobile Navigation Items */}
                {navItems.map(item => {
                return item.text && <li
                    key={item.id}
                    className='p-4 border-b  hover:bg-primary duration-300 hover:text-black cursor-pointer border-darkPrimary'
                >
                    {item.text &&
                      <Link href={item.href} onClick={closeNav}>
                        {item.text}
                      </Link>
                    
                    }
                </li>
              })}
            </ul>
        </div>
    </div>
  );
};

export default Navbar;