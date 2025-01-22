'use client';
import CustomLink from "@/app/components/atoms/custom-link";
import CustomTable from "@/app/components/molecules/custom-table";
import { getTrabajos, offsetWorks } from "@/app/services/works"
import { useEffect, useState } from "react";

export default function Works() {
    const [works, setWorks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [limit,setLimit] = useState(10);
    const [lastDoc, setLastDoc] = useState(null);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const loadInitialWorks = async () => {
            setLoading(true);
            const { newPosts, totalItems, lastVisible } = await getTrabajos(limit, null);
            setWorks(newPosts);
            setTotal(totalItems);
            setLastDoc(lastVisible);
            setLoading(false);
        }
        loadInitialWorks(limit);
    }, [limit]);

    // useEffect(() => {
    //     fetchingMorePost()
    // }, [])

    const fetchingMorePost = async (pageNumber) => {
        // if (pageNumber === currentPage || loading) return;
        if(!lastDoc) return
    
        setLoading(true);
        const { newPosts, lastVisible } = await getTrabajos(limit, lastDoc);
        let tempWorks = await offsetWorks(pageNumber, currentPage, lastVisible);

        setWorks(newPosts);

        setLastDoc(lastVisible);
        setCurrentPage(pageNumber);
        setLoading(false);
    };

    return (
        <div className="m-4 p-8 shadow-xl rounded-lg">
            <div className="flex justify-between">
                <h1 className="text-2xl font-semibold text-dark">Trabajos</h1>
                <CustomLink href={`/dashboard/works/new`} text="Agregar nuevo"/>
            </div>
            <CustomTable 
                data={works}
                headers={['Nombre', 'Fecha','Imágenes', 'Videos']}
                items={['name', 'date', 'images', 'videos']}
                table="works"
                setLimit={(l) => setLimit(l)}
                limit={limit}
                total={total}
                loading={loading}
                fetchPageData={() => fetchingMorePost()}
            >

            </CustomTable>
        </div>
    )
}