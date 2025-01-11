import Link from "next/link"
import { useEffect, useState } from "react"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

export default function CustomTable({data, items, headers, table, limit, setLimit, total, loading, fetchPageData}){

    const [perpage, setPerpage] = useState(limit);
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePerPage = (e) => {
        const { value } = e.target;
        const page = Number(value);
        
        setPerpage(page);
        setLimit(page);
        setCurrentPage(1);
    };

    useEffect(() => {
        const totalItems = total; 
        const draft = Math.ceil(totalItems / perpage); 
        setPages(draft);
    }, [limit, perpage, total]);


    const renderPages = () => {
        return Array.from({ length: pages }).map((_, index) => (
            <li key={index}>
                <a onClick={(e) => handlePageClick(e, index + 1)} // Llamamos a la función de clic
                    className={`flex items-center justify-center px-4 h-10 leading-tight ${
                        currentPage === index + 1
                            ? "text-blue-600 bg-blue-50 border-blue-300"
                            : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                    } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                >
                    {index + 1}
                </a>
            </li>
        ));
    };

    const handlePageClick = (e, pageNumber) => {
        e.preventDefault();
        setCurrentPage(pageNumber);
        fetchPageData(limit)
    };
    
    return (
        <>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-8">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 
                                dark:bg-gray-700 dark:text-gray-400 border-gray-700">
                    <tr >
                        {
                            headers.map((h, i) => {
                                return <th key={i} scope="col" className="p-3">{h}</th>
                            })
                        }
                        <th scope="col" className="p-3">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !data || loading ? 
                        <tr>
                            <td colSpan={headers.length + 1} className="animate-spin">
                                <div className="flex justify-center">
                                    <AiOutlineLoading3Quarters size={'30'}/>
                                </div>
                            </td>
                        </tr> :
                        data.length === 0 ? 'No hay proyectos' :
                        data.map((w) => {
                            return <tr className="bg-white border-b dark:bg-gray-800 
                            dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600" key={w.id}>
                                {
                                    items && items.map((item, index) => {
                                        return <td key={index} className="p-3">{w[item]}</td>
                                    })
                                }
                                <td className="p-3">
                                    <Link href={`/dashboard/${table}/${w.id}`} >Editar</Link>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <div className="flex justify-between mt-2">
                <select onChange={(e) => handlePerPage(e)} value={perpage}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <nav aria-label="Page navigation example">
                    <ul className="flex items-center -space-x-px h-10 text-base">
                        <li>
                        <a onClick={(e) => handlePageClick(e, currentPage - 1)} // Ir a la página anterior
                                className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ${
                                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                                } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                            >
                                <span className="sr-only">Previous</span>
                                <FaArrowLeft />
                            </a>
                        </li>
                        { renderPages() }
                        {/* <li>
                            <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                        </li>
                        <li>
                            <a href="#" aria-current="page" className="z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                        </li>*/}
                        <li> 
                            <a href="#"
                                onClick={(e) => handlePageClick(e, currentPage + 1)} // Ir a la siguiente página
                                className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ${
                                    currentPage === pages ? "pointer-events-none opacity-50" : ""
                                } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                            >
                                <span className="sr-only">Next</span>
                                <FaArrowRight />
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}