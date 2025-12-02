'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import CustomLink from "@/app/components/atoms/custom-link";
import ServiceForm from "@/app/components/organisms/service-form";
import { FaArrowLeft } from "react-icons/fa";
import { slugify } from "@/utils/functions";
import { createService } from "@/app/services/services";

export default function NewService() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [loadingImgUpload, setLoadingImgUpload] = useState(false);
    const [loadingImgDelete, setLoadingImgDelete] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        shortDescription: '',
        description: '',
        images: [],
        videos: [],
        slug: '',
        icon: ''
    });

    const handleInputChange = (e, object=true) => {
        let name, value;
        if(object) {
            ({ name, value } = e.target);
        }else{
            name = 'description';
            value = e
        }

        if (name === "name") {
            const newSlug = slugify(value);
            setFormData((prev) => ({
            ...prev,
            name: value,
            slug: newSlug,
            }));
        } else {
            setFormData((prev) => ({
            ...prev,
            [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.name.trim() == "" && formData.shortDescription.trim() == "" && formData.description.trim() == "" && 
            (formData.images.length == 0 || formData.videos.length == 0)) {
            toast.warning('Debes rellenar los campos importantes')
            return;
        }

        setLoading(true);
        const result = await createService(formData);
        if(result.success) {
            toast.success("Servicio creado correctamente");
            router.push('/dashboard/services');
        } else {
            toast.error("Error al crear el servicio");
            console.log("Error creando el servicio:", result.message || result.error);
            setLoading(false);
        }
        setLoading(false);
    };

    const handleImgUpload = async (e) => {
        console.log('Uploading image...', e);
        e.preventDefault();
        const file = e.target.files[0];
        if (!file) return;

        // 1. Subir a Cloudinary via API route
        const formUpload = new FormData();
        formUpload.append("file", file);

        setLoadingImgUpload(true);
        const res = await fetch("/api/upload", {
            method: "POST",
            body: formUpload,
        });

        const upload = await res.json();
        if (!upload.secure_url) {
            toast.error("Error al subir la imagen");
            setLoadingImgUpload(false);
            return;
        }
        const publicId = upload.public_id;

        // 2. Actualizar estado local
        setFormData((prev) => ({
            ...prev,
            images: [...prev.images, publicId],
        }));
        setLoadingImgUpload(false);
        toast.success("Imagen subida correctamente");
    };

    const handleImgDelete = async (e, id) => {
        e.preventDefault();
        const updatedImages = formData.images.filter(img => img !== publicId);
        
        setLoadingImgDelete(true);

        // 1. Eliminar de Cloudinary via API route
        const res = await fetch("/api/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ publicId }),
        });
        const data = await res.json();
        if(data.error) {
            toast.error("Error al eliminar la imagen en Cloudinary");
            setLoadingImgDelete(false);
            return;
        }  

        // 2. Actualizar estado local
        setFormData((prev) => ({
            ...prev,
            images: updatedImages,
        }));
        setLoadingImgDelete(false);

        toast.success("Imagen eliminada correctamente");
    };

    return (
        <div className="m-4 p-8 shadow-xl rounded-lg">
            <div className="flex items-center justify-between mb-4">
                <CustomLink href={'/dashboard/services'} iconL={<FaArrowLeft size={'20'}/>}/>
                <h1 className='text-2xl font-bold text-dark'>Agregar Nuevo Servicio</h1>
            </div>
            <ServiceForm
                service={formData}
                handleInputChange={(e, b) => handleInputChange(e, b)}
                handleSubmit={handleSubmit}
                loading={loading}
                handleUpload={handleImgUpload}
                loadingImgUpdate={loadingImgUpload}
                onImgDelete={(e, id) => handleImgDelete(e, id)}
                loadingImgDelete={loadingImgDelete}
            />
        </div>
    );
}