import Gallery from "@/app/components/gallery";
import IframeHtmlViewer from "@/app/components/iframe-html-viewer";
import Slider from "@/app/components/slider"
import { getServicioBySlug } from "@/app/services/services";
import { buildMetadata } from "@/utils/metadata";


export async function generateMetadata({ params }) {
  const service = await getServicioBySlug(params.slug);

  return buildMetadata({
    title: service.name,
    description: service.shortDescription || service.description,
    slug: `servicios/${service.slug}`,
    image: service.images?.[0] || "",
  });
}

export default async function Servicio({params}) {
    const { slug } = params;

    const servicioResponse = await getServicioBySlug(slug);
    return <div className="dark:bg-dark bg-light pb-2 mb-10">
       <Slider
        title={servicioResponse.name}
        bg={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}w_1000/${servicioResponse.images[0]}`}
       />

       <section className=" py-4 md:py-0">
        <div 
        className="px-4 py-2 sm:px-8 sm:pt-4  md:max-w-screen-md lg:max-w-screen-lg 
        m-auto pb-8 bg-white dark:bg-black rounded-lg shadow">
            <h3 className="text-3xl text-dark dark:text-secondary my-4 text-center">Descripción general</h3>
           
            <IframeHtmlViewer html={servicioResponse.description} />
            
            {
                servicioResponse.images &&
                <Gallery images={servicioResponse.images} />
            }
        </div>
       </section>

    </div>
}
