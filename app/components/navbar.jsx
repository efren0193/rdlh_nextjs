"use client"

import React, { useState, useEffect} from 'react';
import { useTheme } from 'next-themes';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { CldImage } from 'next-cloudinary';
import { MdBrightness2, MdBrightness7 } from "react-icons/md";
import Link from 'next/link';


const Navbar = () => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);
  const [top, setTop] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { theme, setTheme } = useTheme();

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
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
    { id: 1, text: 'Home', href: '/' },
    { id: 2, text: 'Servicios', href:'/servicios'},
    // { id: 3, text: 'Resources' },
    // { id: 4, text: 'About' },
    { id: 5, text: '', html: theme === 'dark'?<MdBrightness7 onClick={updateTheme}/> : <MdBrightness2 onClick={updateTheme} />},
  ];

  return (
    <div className={`w-full fixed z-10 ${top ? 'shadow-md bg-light dark:bg-black text-dark dark:text-primary':'shadow-none text-primary'}`}>
        <div className=' flex justify-between h-20 items-center px-4 sm:px-8 md:max-w-screen-md lg:max-w-screen-lg mx-auto '>
            {/* Logo */}
            <h1 className='w-full text-3xl font-bold'>
            <CldImage
                width="100"
                height="100"
                src="rh_fb_pz9mbv"/>
            </h1>

            {/* Desktop Navigation */}
            <ul className='hidden md:flex'>
                {navItems.map(item => (
                <li
                    key={item.id}
                    className='p-4 hover:text-secondary rounded-xl m-2 cursor-pointer duration-300 flex items-center'
                >
                  {item.text ?
                    <Link href={item.href}>
                      {item.text}
                    </Link>
                  :
                  item.html
                  }
                </li>
                ))}
            </ul>

            {/* Mobile Navigation Icon */}
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
                <h1 className='w-full text-3xl font-bold m-4'>RH</h1>

                {/* Mobile Navigation Items */}
                {navItems.map(item => (
                <li
                    key={item.id}
                    className='p-4 border-b  hover:bg-primary duration-300 hover:text-black cursor-pointer border-darkPrimary'
                >
                    {item.text ?
                      <Link href={item.href}>
                        {item.text}
                      </Link>
                    :
                    item.html
                    }
                </li>
                ))}
            </ul>
        </div>
    </div>
  );
};

export default Navbar;