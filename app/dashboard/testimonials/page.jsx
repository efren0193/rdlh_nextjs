'use client';
import CustomLink from "@/app/components/atoms/custom-link";
import CustomTable from "@/app/components/molecules/custom-table";
import { getTestimonials } from "@/app/services/testimonials"
import { useEffect, useState } from "react";

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(false);
    const [limit,setLimit] = useState(10);
    const [lastDoc, setLastDoc] = useState(null);
    const [total, setTotal] = useState(0);

    const loadInitialWorks = async (limit) => {
        setLoading(true);
        const { newPosts, totalItems, lastVisible } = await getTestimonials(limit, null);
        setTestimonials(newPosts);
        setTotal(totalItems);
        setLastDoc(lastVisible);
        setLoading(false);
    }

    useEffect(() => {
        loadInitialWorks(limit);
    }, [limit]);

    useEffect(() => {
        fetchingMorePost()
    }, [])

    const fetchingMorePost = async() => {
        if (!lastDoc) return;

        const { newPosts, lastVisible } = await getTestimonials(limit, lastDoc);
        setTestimonials(newPosts);
        setLastDoc(lastVisible);
    }

    return (
        <div className="m-4 p-8 shadow-xl rounded-lg">
            <div className="flex justify-between">
                <h1 className="text-2xl font-semibold text-dark">Testimonios</h1>
                <CustomLink href={`/dashboard/testimonials/new`} text="Agregar nuevo"/>
            </div>
            <CustomTable 
                data={testimonials}
                headers={['Autor', 'Testimonio']}
                items={['autor', 'testimonio']}
                table="testimonials"
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