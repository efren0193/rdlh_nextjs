
'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import CustomLink from "@/app/components/atoms/custom-link";
import ServiceForm from "@/app/components/organisms/service-form";
import { FaArrowLeft } from "react-icons/fa";
import { PulseAnimation } from "@/app/components/atoms/pulse-animation";
import { slugify } from "@/utils/functions";
import { getServiceByID, updateService, updateImages, deleteImage } from "@/app/services/services";


export default function ServiceEdit() {
    const { id } = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [loadingImgUpdate, setLoadingImgUpdate] = useState(false);
    const [loadingImgDelete, setLoadingImgDelete] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        shortDescription: '',
        description: '',
        images: [],
        videos: [],
        slug: '',
        icon: '',
    });

    useEffect(() => {
       const fetchService = async () => {
            setLoading(true); 
            const serviceData = await getServiceByID(id); 
            setFormData(serviceData); 
            setLoading(false); 
        }

        if (id) {
            fetchService(); 
        }
    }, [id]);

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
        if(!formData.name || formData.name.trim() === '') {
            toast.warning("Ingrese un nombre");
            return;
        }
        if(formData.shortDescription.trim() == "" && formData.description.trim() == "" && 
            (formData.images.length == 0 || formData.videos.length == 0)) {
            toast.warning('Debes rellenar los campos importantes')
            return;
        }

        setLoadingUpdate(true);
        const result = await updateService(formData, id);
        if(result.success) {
            toast.success("Servicio actualizado correctamente");
            router.push('/dashboard/services');
        } else {
            setLoadingUpdate(false);
            toast.error("Error al actualizar el servicio");
            console.log("Error actualizando el servicio:", result.message || result.error);
        }
        setLoadingUpdate(false);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (!file) return;

        // 1. Subir a Cloudinary via API route
        const formUpload = new FormData();
        formUpload.append("file", file);

        setLoadingImgUpdate(true);
        const res = await fetch("/api/upload", {
            method: "POST",
            body: formUpload,
        });

        const upload = await res.json();
        if (!upload.secure_url) {
            toast.error("Error al subir la imagen");
            setLoadingImgUpdate(false);
            return;
        }
        const publicId = upload.public_id;
        // 2. Guardar en Firestore
        await updateImages([...formData.images, publicId], id);

        // 3. Actualizar estado local
        setFormData((prev) => ({
            ...prev,
            images: [...prev.images, publicId],
        }));
        setLoadingImgUpdate(false);
        toast.success("Imagen subida correctamente");
    };

    const handleImageDelete = async (e, publicId) => {
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

        // 2. Eliminar de Firestore
        const result = await deleteImage(publicId, id);
        if (!result.success) {
            toast.error("Error al eliminar la imagen en la base de datos");
            setLoadingImgDelete(false);
            return;
        }   

        // 3. Actualizar estado local
        setFormData((prev) => ({
            ...prev,
            images: updatedImages,
        }));
        setLoadingImgDelete(false);

        toast.success("Imagen eliminada correctamente");
    }

    return (
        <div className="m-4 p-8 shadow-xl rounded-lg">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-semibold text-dark">Editar Servicio</h1>
                <CustomLink href={`/dashboard/services`} text="Volver a servicios" iconL={<FaArrowLeft />} />
            </div>

            {
                loading ?
                <PulseAnimation/> :
                <ServiceForm
                    service={formData}
                    handleInputChange={(e, b) => handleInputChange(e, b)}
                    handleSubmit={(e) => handleSubmit(e)}
                    handleUpload={handleUpload}
                    loadingImgUpdate={loadingImgUpdate}
                    loadingImgDelete={loadingImgDelete}
                    loading={loadingUpdate}
                    onImgDelete={(e, id) => handleImageDelete(e, id)}
                />
            }
            
        </div>
    );
}