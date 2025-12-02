'use client';
import CustomLink from "@/app/components/atoms/custom-link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import InvitationForm from "@/app/components/organisms/invitation-form";
import { createInvitation } from "@/app/services/invitations";
import { slugify } from "@/utils/functions";
import { toast } from "sonner";

export default function NewInvitation() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        url: '',
        html: '',
        slug: ''
    });

    const handleInputChange = (e, object=true) => {
       let name, value;
        if(object) {
            ({ name, value } = e.target);
        }else{
            name = 'html';
            value = e
        }

         if (name === "title") {
            const newSlug = slugify(value);
            setFormData((prev) => ({
            ...prev,
            title: value,
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
        if(!formData.title || formData.title.trim() === '') {
            toast.warning("Ingrese un título");
            return;
        }
        if((!formData.url || formData.url.trim() === '') && (!formData.html || formData.html.trim() === '')) {
            toast.warning("Ingrese un contenido HTML o una URL");
            return;
        }
        const result = await createInvitation(formData);
        if(result.success) {
            router.push('/dashboard/invitations');
        } else {
            toast.error("Error creando la invitación:", result.message || result.error);
        }
    }

    return (
        <div className="m-4 p-8 shadow-xl rounded-lg">
            <div className="flex items-center justify-between mb-4">
                <CustomLink href={'/dashboard/invitations'} iconL={<FaArrowLeft size={'20'}/>}/>
                <h1 className='text-2xl font-bold text-dark'>Agregar Nueva Invitación</h1>
            </div>
            <InvitationForm
                invitation={formData}
                handleInputChange={(e, b) => handleInputChange(e, b)}
                handleSubmit={(e) => handleSubmit(e)}
            />
        </div>
    )
}