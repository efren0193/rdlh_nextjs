import Gallery from "@/app/components/gallery";
import IframeHtmlViewer from "@/app/components/iframe-html-viewer";
import VideoGallery from "@/app/components/organisms/video-gallery";
import Slider from "@/app/components/slider"
import Videos from "@/app/components/videos";
import { getTrabajoBySlug } from "@/app/services/works";
import { buildMetadata } from "@/utils/metadata";

export async function generateMetadata({ params }) {
  const work = await getTrabajoBySlug(params.slug);

  return buildMetadata({
    title: work.name,
    description: work.shortDescription || work.description,
    slug: `producciones/${work.slug}`,
    image: work.images?.[0] || "",
  });
}

export default async function Trabajo({params}) {

    const { slug } = params;

    const trabajoResponse = await getTrabajoBySlug(slug);
    console.log(trabajoResponse);
    return <div className="dark:bg-dark bg-light pb-2 mb-10">
       <Slider
        title={trabajoResponse.name}
        bg={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}w_1000/${trabajoResponse.images?.[0]}`}
       />

       <section className=" py-4 md:py-0">
        <div 
        className="px-4 py-2 sm:px-8 sm:pt-4  md:max-w-screen-md lg:max-w-screen-lg 
        m-auto pb-8 bg-white dark:bg-black rounded-lg shadow-md">
            <h3 className="text-3xl text-dark dark:text-secondary my-4 text-center">Descripción general</h3>
            {
              trabajoResponse.description &&
              <IframeHtmlViewer html={trabajoResponse.description} />
            }
            
            {
              trabajoResponse.images &&
              <Gallery images={trabajoResponse.images} />
            }

            {
              trabajoResponse.videos &&
              <Videos videos={trabajoResponse.videos} />
            }

        </div>
       </section>

    </div>
}
