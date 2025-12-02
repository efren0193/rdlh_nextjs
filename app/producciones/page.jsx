import Posts from "../components/posts";
import Slider from "../components/slider";
import { buildMetadata } from "@/utils/metadata";

const productionDescription =
  "Cada producción que realizamos es el resultado de una combinación de creatividad, técnica y pasión.";

export const metadata = buildMetadata({
  title: "Producciones",
  description: productionDescription,
  slug: "producciones",
  keywords: ["servicios", "producción", "video", "audio", "fotografía"],
});


async function Produccion() {
    return <div className="dark:bg-dark bg-light pb-2 mb-10">
        <Slider
            title={'Nuestras producciones'}
            subtitle={productionDescription}
           />

        <Posts/>
    </div>
}

export default Produccion;