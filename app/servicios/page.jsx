import Services from "../components/services";
import Slider from "../components/slider";

export default function Servicios() {
    return <div className="dark:bg-dark bg-light pb-2 mb-10">
       <Slider
        title={'Servicios'}
        subtitle={'Ofrecemos una amplia gama de servicios profesionales en audio, video, fotografía y sonido, diseñados para capturar y resaltar la esencia de cada proyecto. '}
       />
       <Services/>
    </div>
}