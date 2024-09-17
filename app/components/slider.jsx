'use client'
import React from "react";
import Button from "./atoms/custom-button";
import SvgComponent from "../home/svg-diagonal";
import CustomLink from "./atoms/custom-link";

export default function Slider({
    title, 
    subtitle, 
    main=false,
    bg=`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}w_2000/montania1_3.8.1_j7daos.jpg`
}) {
    
    return (
        <div 
            className={`bg-cover bg-center w-full ${main ? 'h-[45rem]': 'h-[30rem]'} relative`}
            style={{backgroundImage: `url(${bg})`}}
        >
            <div className={`absolute top-0 bg-neutral-950 bg-opacity-50 w-full ${main ? 'h-[45rem]': 'h-[30rem]'}`}></div>
            <div className={`absolute ${main ? 'h-[45rem]': 'h-[30rem]'} flex w-full`}>
                <div className="m-auto text-primary text-center">
                    <h1 className="text-5xl md:text-6xl mb-5">{title}</h1>
                    <p className="text-lg m-auto md:text-2xl md:w-3/4 px-4">{subtitle}</p>
                   {main && <div className="grid md:flex md:justify-around justify-center items-center m-auto mt-24 w-full md:w-1/2 gap-6 md:gap-0">
                            <CustomLink href={'/producciones'} text={'Nuestro Trabajo'}/>
                            <Button text="Contáctanos"/>
                    </div>
                    }
                </div>
            </div>
            <SvgComponent className="absolute bottom-0 w-full h-auto dark:text-dark text-light "/>
            
        </div>
    )
}