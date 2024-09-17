import Card from "./molecules/card";
import CustomLink from "./atoms/custom-link";
import { getServicios } from "../services";


async function Services({main=false}) {
    const services = await getServicios(main);

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
                                slug={`/servicios/${service.slug}`}
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