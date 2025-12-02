'use client';
import { useState, useEffect } from 'react';
import { getWork, updateWork } from "@/app/services/works";
import { useParams, useRouter } from "next/navigation";
import CustomLink from '@/app/components/atoms/custom-link';
import { FaArrowLeft } from 'react-icons/fa';
import WorkForm from '@/app/components/organisms/work-form';
import { PulseAnimation } from '@/app/components/atoms/pulse-animation';
import { toast } from 'sonner';
import { slugify } from '@/utils/functions';

export default function WorkEdit() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false); 
    const [loadingUpdate, setLoadingUpdate] = useState(false); 
    const router = useRouter();

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


    const handleInputChange = (e, object=true) => {
        let name, value, slug;
        if(object) {
            ({ name, value } = e.target);
            if(name === 'name') {
                slug = slugify(value);
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

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoadingUpdate(true);
        const result = await updateWork(work, id);
        if(result) {
            router.push('/dashboard/works');
            toast.success('Información actualizada con éxito.')
            return;
        }
        toast.error('No se actualizó la información')
        setLoadingUpdate(false);
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
                            handleSubmit={handleSubmit}
                            loading={loadingUpdate}
                        />
                    </>
                )
            }
            
        </div>
    );
}