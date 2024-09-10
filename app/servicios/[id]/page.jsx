import Slider from "@/app/components/slider"
import { db } from "@/app/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";

const RES_URL = 'https://res.cloudinary.com/dfmzimnpq/image/upload/w_1000/';

async function loadServicio(params) {
    const q = query(collection(db, 'servicios'), where('slug','==', params));
    const snapshot = await getDocs(q);
    const servicios = snapshot.docs.map(doc => doc.data()); 

    return servicios.length ? servicios[0] : null;
}

export default async function Servicio({params}) {

    const { id } = params;

    const servicioResponse = await loadServicio(id);

    return <div className="dark:bg-dark bg-light pb-2 mb-10">
       <Slider
        title={servicioResponse.name}
        bg={`${RES_URL}/${servicioResponse.images[0]}`}
       />

       <section className=" pb-4 py-4 md:py-0">
        <div 
        className="px-4 py-2 sm:px-8 sm:pt-4  md:max-w-screen-md lg:max-w-screen-lg 
        m-auto pb-8 bg-white dark:bg-black rounded-lg shadow-md">
            <h3 className="text-3xl text-dark dark:text-secondary my-4 ">Descripción general</h3>
            {<div dangerouslySetInnerHTML={{__html: servicioResponse.description}}></div>}
        </div>
       </section>
    </div>
}
