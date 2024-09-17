'use client'
import React from "react";
import SvgComponent from "./svg-diagonal1";
import SvgDiagonal2 from "./svg-diagonal2";

export default function Slider1() {
    return (
        <div 
            className='bg-cover bg-center sm:h-[23rem] md:h-[25rem] lg:h-[28rem] xl:h-[32rem]'
            style={{backgroundImage: `url(${process.env.NEXT_PUBLIC_CLOUDINARY_URL}w_2000/montania1_3.8.1_j7daos.jpg)`}}
        >
            <SvgComponent className=" dark:text-dark text-light bg-neutral-950 bg-opacity-50"/>
            <div className="min-h-[15rem] py-6 md:py-0 flex items-center w-full bg-neutral-950 bg-opacity-50">
                <div className=" m-auto text-primary text-center">
                    <h1 className="text-4xl md:text-5xl mb-5">Momentos únicos, capturados con pasión</h1>
                    <p className="text-md m-auto md:text-xl md:w-3/4 px-4">Cada proyecto refleja nuestra dedicación a la cultura y la creatividad, ofreciendo resultados auténticos y de alta calidad.</p>
                </div>
            </div>
            <SvgDiagonal2 className='w-full dark:text-black text-white bg-neutral-950 bg-opacity-50' />
            <div className=" bg-white dark:bg-black h-full w-full"></div>
        </div>
    )
}