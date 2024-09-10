'use client'
import { useEffect, useState } from "react"
import { MdFacebook } from "react-icons/md";
import { FaYoutube, FaInstagram } from 'react-icons/fa'

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
                <MdFacebook size={'30'} />
                <FaYoutube size={'30'}/>
                <FaInstagram size={'30'} />
            </div>
            <p>Términos y condiciones</p>
        </div>
    )
}