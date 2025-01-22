'use client';
import { useState, useEffect } from 'react';
import { getWork } from "@/app/services/services";
import { useParams } from "next/navigation";
import CustomLink from '@/app/components/atoms/custom-link';
import { FaArrowLeft } from 'react-icons/fa';
import WorkForm from '@/app/components/organisms/work-form';
import { PulseAnimation } from '@/app/components/atoms/pulse-animation';

export default function WorkEdit() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true); 
    const [work, setWork] = useState({
        name: '',
        shortDescription: '',
        description: '',
        type: 'work',
        date: '',
        images: [],
        videos: [],
        audios: [],
        slug: ''
    });

    
    useEffect(() => {
        const fetchWork = async () => {
            setLoading(true); 
            const workData = await getWork(id); 
            setWork(workData); 
            setLoading(false); 
        };

        if (id) {
            fetchWork(); 
        }
    }, [id]);

    const generateSlug = (v) => {
        return v
            .toString()                     
            .toLowerCase()                  
            .trim()                         
            .normalize('NFD')               
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9 -]/g, '')    
            .replace(/\s+/g, '-')           
            .replace(/-+/g, '-');
    }

    const handleInputChange = (e, object=true) => {
        let name, value, slug;
        if(object) {
            ({ name, value } = e.target);
            if(name === 'name') {
                slug = generateSlug(value);
            }
        }else{
            name = 'description';
            value = e
        }

        if(name === 'name') {
            setWork({
                ...work,
                'name': value,
                'slug': slug
            });
        }else {
            setWork({
                ...work,
                [name]: value,
            }); 
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(work)
    };


    return (
        <div className="m-4 p-8 shadow-xl rounded-lg">
            {
                loading ?
                <PulseAnimation/> :
                (
                    <>
                        <div className="flex items-center justify-between mb-4">
                            <CustomLink href={'/dashboard/works'} iconL={<FaArrowLeft size={'20'}/>}/>
                            <h1 className='text-2xl font-bold text-dark'>Editar {work.name}</h1>
                        </div>
                        <WorkForm
                            work={work}
                            handleInputChange={(e, b) => handleInputChange(e, b)}
                            handleSubmit={() => handleSubmit()}
                        />
                    </>
                )
            }
            
        </div>
    );
}