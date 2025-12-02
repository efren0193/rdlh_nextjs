'use client'
import { useEffect, useState } from "react";
import { getTrabajos } from "@/app/services/works";
import CustomLink from "@/app/components/atoms/custom-link";
import CustomTable from "@/app/components/molecules/custom-table";

export default function Works() {
    const [works, setWorks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageCursors, setPageCursors] = useState([null]); 
    // pageCursors[page] = cursor

    const loadPage = async (page) => {
        setLoading(true);

        const cursor = pageCursors[page - 1] ?? null;

        const { newPosts, lastVisible, totalItems } = await getTrabajos(limit, cursor);

        setWorks(newPosts);
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
                <h1 className="text-2xl font-semibold text-dark">Trabajos</h1>
                <CustomLink href={`/dashboard/works/new`} text="Agregar nuevo" />
            </div>

            <CustomTable
                data={works}
                headers={['Nombre', 'Fecha','Imágenes', 'Videos']}
                items={['name', 'date', 'images', 'videos']}
                table="works"
                tablename="Producciones"
                setLimit={setLimit}
                limit={limit}
                total={total}
                loading={loading}
                currentPage={currentPage}
                fetchPageData={loadPage}
            />
        </div>
    );
}
