'use client'
import { useEffect, useState } from "react"
import { MdFacebook } from "react-icons/md";
import { FaYoutube, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa'
import Link from "next/link";

export default function Footer() {
    const [year, setYear] = useState(0);

    useEffect(() => {
        const date = new Date();
        setYear(date.getFullYear());
    }, []); 

    return (
        <div className="text-dark dark:text-primary grid grid-flow-row md:grid-flow-col 
        py-8 px-8 justify-center md:justify-between text-center md:text-justify bg-opacity-90
         bg-light dark:bg-dark space-y-4 md:space-y-0">
            
            <p> &copy; {year}, Rincón de la Huasteca </p>
            <div className="flex justify-between space-x-4 md:space-x-8">
                <Link href={'https://www.facebook.com/rincondelahuasteca'} target="_blank">
                    <MdFacebook size={'30'} />
                </Link>
                <Link href={'https://www.youtube.com/c/Rinc%C3%B3ndelaHuasteca'} target="_blank">
                    <FaYoutube size={'30'}/>
                </Link>

                <Link href={'https://www.instagram.com/rincondelahuasteca/'} target="_blank">
                    <FaInstagram size={'30'} />
                </Link>

                <Link href={'https://www.tiktok.com/@rincondelahuasteca'} target="_blank">
                    <FaTiktok size={'30'} />
                </Link>

                <Link href={'https://api.whatsapp.com/send?phone=4831092074'} target="_blank">
                    <FaWhatsapp size={'30'} />
                </Link>
            </div>
            <p>Términos y condiciones</p>
        </div>
    )
}