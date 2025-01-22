'use client'
import CustomLink from "@/app/components/atoms/custom-link";
import WorkForm from "@/app/components/organisms/work-form";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "sonner";

var curr = new Date();

export default function New() {
    const {loading, setLoading} = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        shortDescription: '',
        description: '',
        type: 'work',
        date: curr.toISOString(),
        images: [],
        videos: [],
        audios: [],
        slug: ''
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
        if(formData.name.trim() == "" && 
            (formData.images.length == 0 || formData.videos.length == 0)) {
            toast.warning('Debes rellenar los campos importantes')
            return;
        }
    };

    return (
        <div className="m-4 p-8 shadow-xl rounded-lg">
            <div className="flex items-center justify-between mb-4">
                <CustomLink href={'/dashboard/works'} iconL={<FaArrowLeft size={'20'}/>}/>
                <h1 className='text-2xl font-bold text-dark'>Agregar Nuevo Trabajo</h1>
            </div>
            <WorkForm
                work={formData}
                handleInputChange={(e, b) => handleInputChange(e, b)}
                handleSubmit={handleSubmit}
                loading={loading}
            />
        </div>
    );
}