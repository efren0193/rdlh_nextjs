import { db } from "../firebase-config";
import { collection,getDocs, limit, query } from "firebase/firestore";
import Card from "./molecules/card";
import CustomLink from "./atoms/custom-link";

async function loadServices(main) {
    const q = main ? query(collection(db, "servicios"), limit(3)) : query(collection(db, "servicios"));
    const servRef = await getDocs(q);
    const data = [];

    servRef.forEach((doc) => data.push({id: doc.id, ...doc.data()}))
    return data;
}

async function Services({main=false}) {
    const services = await loadServices(main);

    return (
        <div>
            <div className="px-4 my-8 sm:px-8 md:max-w-screen-md lg:max-w-screen-lg m-auto">

                {main && <h3 className="text-3xl text-dark dark:text-secondary mb-4 ">Servicios</h3> }
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4  justify-center mb-8">
                    {services.map((service) => {
                        return <div key={service.id} className="flex">
                            <Card
                                type={'image'}
                                image={service.images[0]}
                                name={service.name}
                            ></Card>
                        </div>
                    })}
                </div>

                {main && <div className="flex justify-center lg:justify-end">
                    <CustomLink 
                        text={'Ver mas Servicios'}
                        href={'/servicios'}
                    />
                </div>}
            </div>
        </div>
    )
}

export default Services;