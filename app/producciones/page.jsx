import Posts from "../components/posts";
import Slider from "../components/slider";

async function Produccion() {
    return <div className="dark:bg-dark bg-light pb-2 mb-10">
        <Slider
            title={'Nuestras producciones'}
            subtitle={'Cada producción que realizamos es el resultado de una combinación de creatividad, técnica y pasión.'}
           />

        <Posts/>
    </div>
}

export default Produccion;