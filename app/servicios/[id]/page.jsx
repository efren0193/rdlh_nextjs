import Gallery from "@/app/components/gallery";
import Slider from "@/app/components/slider"
import { getServicio } from "@/app/services";

export default async function Servicio({params}) {
    const { id } = params;

    const servicioResponse = await getServicio(id);

    return <div className="dark:bg-dark bg-light pb-2 mb-10">
       <Slider
        title={servicioResponse.name}
        bg={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}w_1000/${servicioResponse.images[0]}`}
       />

       <section className=" py-4 md:py-0">
        <div 
        className="px-4 py-2 sm:px-8 sm:pt-4  md:max-w-screen-md lg:max-w-screen-lg 
        m-auto pb-8 bg-white dark:bg-black rounded-lg shadow-md">
            <h3 className="text-3xl text-dark dark:text-secondary my-4 text-center">Descripción general</h3>
            {<div className="mb-8" dangerouslySetInnerHTML={{__html: servicioResponse.description}}></div>}
            
            <Gallery servicioResponse={servicioResponse} />
        </div>
       </section>

    </div>
}
