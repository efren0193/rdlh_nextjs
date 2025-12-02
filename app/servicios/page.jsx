import Services from "../components/services";
import Slider from "../components/slider";
import { buildMetadata } from "@/utils/metadata";

const serviceDescription =
  "Ofrecemos una amplia gama de servicios profesionales en audio, video, fotografía y sonido, diseñados para capturar y resaltar la esencia de cada proyecto.";

export const metadata = buildMetadata({
  title: "Servicios",
  description: serviceDescription,
  slug: "servicios",
  keywords: ["servicios", "producción", "video", "audio", "fotografía"],
});

export default function Servicios() {
    return <div className="dark:bg-dark bg-light pb-2 mb-10">
       <Slider
        title={'Servicios'}
        subtitle={serviceDescription}
       />
       <Services/>
    </div>
}