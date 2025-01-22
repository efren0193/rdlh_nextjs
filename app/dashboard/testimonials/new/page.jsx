'use client'
import CustomLink from "@/app/components/atoms/custom-link";
import TestimonialForm from "@/app/components/organisms/testimonial-form";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function New() {
    const [formData, setFormData] = useState({
        autor: '',
        testimonio: '',
        date: '',
    });

    const handleInputChange = (e, object=true) => {
        let name, value;
        if(object) {
            ({ name, value } = e.target);
        }else{
            name = 'description';
            value = e
        }

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting", formData);
        // Lógica para guardar el nuevo ítem
    };

    return (
        <div className="m-4 p-8 shadow-xl rounded-lg">
            <div className="flex items-center justify-between mb-4">
                <CustomLink href={'/dashboard/testimonials'} iconL={<FaArrowLeft size={'20'}/>}/>
                <h1 className='text-2xl font-bold text-dark'>Agregar Nuevo Testimonio</h1>
            </div>
            <TestimonialForm
                testimonial={formData}
                handleInputChange={(e, b) => handleInputChange(e, b)}
                handleSubmit={() => handleSubmit()}
            />
        </div>
    );
}