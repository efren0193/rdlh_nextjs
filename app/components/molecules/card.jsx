'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import CustomLink from "../atoms/custom-link";
import { FaPlus } from "react-icons/fa";
import { YouTubeEmbed } from '@next/third-parties/google';

export default function Card({image, name, description='', type, slug}){

    const [cardType, setCardType] = useState('');

    useEffect(() => {
        if(type === 'image') {
            setCardType(`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}c_thumb,w_300/${image}`)
        }
    }, [type, image])

    return <div className="max-w-md w-80 border bg-gradient-to-b from-white via-white to-darkSecondary dark:from-dark dark:via-dark dark:to-secondaryDark border-gray-200 rounded-lg shadow-md hover:shadow-lg dark:bg-opacity-15 dark:border-gray-700">
        {type === 'image' ? <Link href={slug}>
            <div className={`h-40 w-full bg-cover bg-center rounded-t-lg`} style={{backgroundImage: `url(${cardType})`}} ></div>
        </Link>
        :
        <div className="">
            <YouTubeEmbed videoid={image}/>
        </div>
        }
        <div className="">
            <div className="p-5">
                <h5 className="mb-2 text-xl font-semibold tracking-tight text-dark dark:text-white">{name}</h5>
                <hr className="border dark:border-darkPrimary border-darkPrimary border-opacity-50" />
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-2">{description}</p>
                <div className="flex justify-end mt-6 align-bottom">
                    {slug && <CustomLink iconL={<FaPlus size={'15'} />} text={'Información'} href={slug} />}
                </div>
            </div>
        </div>
    </div>
    
}