import { db } from "../firebase-config";
import { collection,getDocs, query } from "firebase/firestore";
import SvgComponent from "./svg-diagonal";
import SvgDiagonal3 from "./svg-diagonal3";
import TestimonialContent from "../components/testimonial-content";


async function loadTestimonials() {
    const q = query(collection(db, "testimonios"));
    const servRef = await getDocs(q);
    const data = [];

    servRef.forEach((doc) => data.push({id: doc.id, ...doc.data()}))
    return data;
}

async function Testimonials() {

    const testimonials = await loadTestimonials();
    return (
        <div 
            className='bg-cover bg-center text-primary'
            style={{backgroundImage: 'url(https://res.cloudinary.com/dfmzimnpq/image/upload/w_2000/montania1_3.8.1_j7daos.jpg)'}}
        >
            <SvgDiagonal3 className='w-full dark:text-black text-white bg-neutral-950 bg-opacity-50' />
            <div className="min-h-[15rem] md:h-[20rem] py-6 md:py-0 w-full bg-neutral-950 bg-opacity-50 grid">
                
                <h1 className="text-2xl md:text-4xl mb-5 text-center">Testimonios</h1>
                <TestimonialContent testimonials={testimonials} />
            </div>
            <SvgComponent className=" dark:text-dark text-light bg-neutral-950 bg-opacity-50"/>
            <div className=" bg-light dark:bg-dark  w-full"></div>
        </div>
    );
}

export default Testimonials;