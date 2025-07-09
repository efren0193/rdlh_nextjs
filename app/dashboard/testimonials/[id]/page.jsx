'use client';
import { useState, useEffect } from 'react';
import { getTestimonial } from "@/app/services/testimonials";
import { useParams } from "next/navigation";
import CustomLink from '@/app/components/atoms/custom-link';
import { FaArrowLeft } from 'react-icons/fa';
import TestimonialForm from '@/app/components/organisms/testimonial-form';
import { PulseAnimation } from '@/app/components/atoms/pulse-animation';

export default function TestimonialEdit() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true); 
    const [testimonial, setTestimonial] = useState({
        autor: '',
        testimonio: '',
        date: ''
    });

    
    useEffect(() => {
        const fetchTestimonial = async () => {
            setLoading(true); 
            const testimonialData = await getTestimonial(id); 
            setTestimonial(testimonialData); 
            setLoading(false); 
        };

        if (id) {
            fetchTestimonial(); 
        }
    }, [id]);

    const handleInputChange = (e) => {
        let name, value;
            ({ name, value } = e.target);
           
            setTestimonial({
                ...testimonial,
                [name]: value,
            }); 
    };


    return (
        <div className="m-4 p-8 shadow-xl rounded-lg">
            {
                loading ?
                <PulseAnimation/> :
                (
                    <>
                        <div className="flex items-center justify-between mb-4">
                            <CustomLink href={'/dashboard/testimonials'} iconL={<FaArrowLeft size={'20'}/>}/>
                            <h1 className='text-2xl font-bold text-dark'>Testimonio de {testimonial.autor}</h1>
                        </div>
                        <TestimonialForm
                            testimonial={testimonial}
                            handleInputChange={(e) => handleInputChange(e)}
                            handleSubmit={() => handleSubmit()}
                        />
                    </>
                )
            }
            
        </div>
    );
}