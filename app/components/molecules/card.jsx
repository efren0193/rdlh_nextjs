'use client'
import { useEffect, useState } from "react";
import Button from "../atoms/custom-button";
import { MdArrowForward } from "react-icons/md";

export default function Card({image, name, description='', type}){

    const [cardType, setCardType] = useState('');

    useEffect(() => {
        if(type === 'image') {
            setCardType(`https://res.cloudinary.com/dfmzimnpq/image/upload/c_thumb,w_300/${image}`)
        }else {
            setCardType(`https://img.youtube.com/vi/${image}/hqdefault.jpg`)
        }
    }, [type, image])

    return <div className="max-w-md w-80 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg dark:bg-white dark:bg-opacity-15 dark:border-gray-700">
        <div className={`h-40 w-full bg-cover bg-center rounded-t-lg`} style={{backgroundImage: `url(${cardType})`}} ></div>
        <div className="p-5">
            <h5 className="mb-2 text-xl font-semibold tracking-tight text-dark dark:text-white">{name}</h5>
            <hr className="border dark:border-darkPrimary border-darkPrimary border-opacity-50" />
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
            <div className="flex justify-end mt-6 align-bottom">
                <Button text={'Más información'} icon={<MdArrowForward size="30" />}/>
            </div>
        </div>
    </div>
    
}