'use client';
import CustomLink from "@/app/components/atoms/custom-link";
import CustomTable from "@/app/components/molecules/custom-table";
import { getServices } from "@/app/services/services"
import { useEffect, useState } from "react";

export default function Services() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [limit,setLimit] = useState(10);
    const [total, setTotal] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageCursors, setPageCursors] = useState([null]);

    const loadPage = async (page) => {
        setLoading(true);

        const cursor = pageCursors[page - 1] ?? null;

        const { newPosts, lastVisible, totalItems } = await getServices(limit, cursor);

        setServices(newPosts);
        setTotal(totalItems);
        setCurrentPage(page);

        // Guardamos cursor de esta página
        if (lastVisible && !pageCursors[page]) {
            setPageCursors(prev => {
                const newArr = [...prev];
                newArr[page] = lastVisible;
                return newArr;
            });
        }

        setLoading(false);
    };

    useEffect(() => {
        loadPage(1);
    }, [limit]);

    return (
        <div className="m-4 p-8 shadow-xl rounded-lg">
            <div className="flex justify-between">
                <h1 className="text-2xl font-semibold text-dark">Servicios</h1>
                <CustomLink href={`/dashboard/services/new`} text="Agregar Nuevo Servicio"/>
            </div>
            <CustomTable 
                data={services}
                headers={['Nombre', 'Fecha','Imágenes', 'Videos']}
                items={['name', 'date', 'images', 'videos']}
                table="services"
                tablename="Servicios"
                setLimit={setLimit}
                limit={limit}
                total={total}
                loading={loading}
                currentPage={currentPage}
                fetchPageData={loadPage}
            />
        </div>
    )
}