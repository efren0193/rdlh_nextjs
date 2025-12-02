"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import Link from "next/link";
import { CldImage } from "next-cloudinary";

import {
  AiOutlineClose,
  AiOutlineMenu,
} from "react-icons/ai";
import {
  MdBrightness2,
  MdBrightness7
} from "react-icons/md";

const Navbar = ({ servicios }) => {
  const pathname = usePathname();

  // ------------------------------
  // Estados
  // ------------------------------
  const [mounted, setMounted] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { theme, setTheme } = useTheme();

  // Evitar problemas de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  // Detectar scroll
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ------------------------------
  // Handlers
  // ------------------------------
  const toggleTheme = () =>
    setTheme(theme === "dark" ? "light" : "dark");

  const toggleNav = () => setNavOpen((p) => !p);
  const closeNav = () => setNavOpen(false);

  // ------------------------------
  // Menú principal
  // ------------------------------
  const navItems = [
    { id: 1, text: "Inicio", href: "/" },
    {
      id: 2,
      text: "Servicios",
      href: "/servicios",
      submenu: servicios.map((s) => ({
        id: s.id,
        name: s.name,
        href: `/servicios/${s.slug}`,
      })),
    },
    { id: 3, text: "Producciones", href: "/producciones" },
    {
      id: 4,
      text: "",
      html:
        theme === "dark" ? (
          <MdBrightness7 onClick={toggleTheme} className="cursor-pointer" />
        ) : (
          <MdBrightness2 onClick={toggleTheme} className="cursor-pointer" />
        ),
    },
  ];

  if (!mounted) return null;
  
  // ❗ Ocultar navbar en invitaciones
  if (pathname.startsWith("/invitaciones")) return null;

  // ------------------------------
  // Render
  // ------------------------------
  return (
    <nav
      className={`w-full fixed z-20 transition-all duration-300 ${
        isScrolled
          ? "shadow-md bg-light dark:bg-black text-dark dark:text-primary"
          : "bg-transparent text-primary"
      }`}
    >
      <div className="flex justify-between items-center h-20 px-4 sm:px-8 md:max-w-screen-md lg:max-w-screen-lg mx-auto">
        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <CldImage
            width="90"
            height="90"
            src="rh_fb_pz9mbv"
            alt="RH Logo"
            className="cursor-pointer"
          />
        </Link>

        {/* MENU DESKTOP */}
        <ul className="hidden md:flex items-center gap-5">
          {navItems.map((item) =>
            item.text ? (
              <li
                  key={item.id}
                  className={`p-4 dark:hover:text-primary hover:text-secondaryDark  rounded-xl m-2 cursor-pointer flex items-center ${
                    item.submenu ? 'group relative' : ''
                  }`}
                >
                <Link href={item.href} className="flex items-center
                    hover:border-b dark:hover:border-primary 
                      hover:border-secondary transition-all duration-200
                    ">
                  {item.text}
                </Link>

                {/* SUBMENU */}
                {item.submenu && (
                 <div className={`absolute left-1/2 transform -translate-x-1/2 top-full hidden group-hover:block 
                    bg-light dark:bg-black shadow-xl rounded-md min-w-[250px] z-50 
                    transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0`}>
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.id}
                        href={sub.href}
                        className="block px-4 py-2 hover:text-secondaryDark dark:hover:text-primary border-b border-gray-200 dark:border-gray-700 last:border-none"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ) : (
              <li key={item.id}>{item.html}</li>
            )
          )}
        </ul>

        {/* ICONOS MOBILE */}
        <div className="flex md:hidden items-center gap-4">
          {theme === "dark" ? (
            <MdBrightness7 onClick={toggleTheme} className="cursor-pointer" />
          ) : (
            <MdBrightness2 onClick={toggleTheme} className="cursor-pointer" />
          )}

          <button onClick={toggleNav}>
            {navOpen ? <AiOutlineClose size={22} /> : <AiOutlineMenu size={22} />}
          </button>
        </div>

        {/* MENU MOBILE */}
        <ul
          className={`fixed top-0 left-0 h-full w-[65%] p-6 bg-light dark:bg-dark text-dark dark:text-primary shadow-lg transition-transform duration-300 md:hidden
            ${navOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <h1 className="text-3xl font-bold mb-6 cursor-pointer">
            <Link href="/" onClick={closeNav}>
              RH
            </Link>
          </h1>

          {navItems.map((item) =>
            item.text ? (
              <li
                key={item.id}
                className="mb-4 text-lg border-b border-gray-300 dark:border-gray-700 pb-3"
              >
                <Link href={item.href} onClick={closeNav}>
                  {item.text}
                </Link>
              </li>
            ) : (
              <li key={item.id} className="mb-4">
                {item.html}
              </li>
            )
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
