import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function CustomTable({
  data,
  items,
  headers,
  table,
  tablename = 'Proyectos',
  limit,
  setLimit,
  total = 0,
  loading = false,
  fetchPageData,       // función (pageNumber) => Promise
  currentPage = 1      // debe venir del padre
}) {
  const [perPage, setPerPage] = useState(limit || 10);
  const [pages, setPages] = useState(0);

  // recalcula páginas cuando cambian total o perPage
  useEffect(() => {
    const p = perPage > 0 ? Math.max(0, Math.ceil(total / perPage)) : 0;
    setPages(p);
  }, [total, perPage]);

  // sincroniza perPage cuando cambia limit desde el padre
  useEffect(() => {
    if (limit && limit !== perPage) setPerPage(limit);
  }, [limit]);

  // Cambiar el número de elementos por página
  const handlePerPage = (e) => {
    const newLimit = Number(e.target.value);
    setPerPage(newLimit);
    setLimit(newLimit); // notifica al padre para recargar la página 1
    // opcional: pedir a padre cargar la página 1 inmediatamente
    if (fetchPageData) fetchPageData(1);
  };

  // Cambiar de página
  const handlePageClick = async (e, pageNumber) => {
    e && e.preventDefault && e.preventDefault();

    // protección: valid range
    if (!fetchPageData) return;
    if (pageNumber < 1) return;
    if (pages > 0 && pageNumber > pages) return;
    if (pageNumber === currentPage) return;

    await fetchPageData(pageNumber);
    // el padre debe actualizar currentPage después de la carga
  };

  // Renderizar botones de paginación (si no hay páginas, nada)
  const renderPages = () => {

    return Array.from({ length: pages }).map((_, index) => {
      const pageNum = index + 1;
      const isActive = pageNum === currentPage;

      return (
        <li key={pageNum}>
          <a
            onClick={(e) => handlePageClick(e, pageNum)}
            className={`flex items-center justify-center px-4 h-10 leading-tight border ${
              isActive
                ? "text-blue-600 bg-blue-50 border-blue-300"
                : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            }`}
          >
            {pageNum}
          </a>
        </li>
      );
    });
  };

  const prevDisabled = currentPage <= 1;
  const nextDisabled = pages <= 1 || currentPage >= pages;

  return (
    <>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-8">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="p-3">
                {header}
              </th>
            ))}
            <th className="p-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={headers.length + 1} className="animate-spin">
                <div className="flex justify-center">
                  <AiOutlineLoading3Quarters size="30" />
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={headers.length + 1} className="text-center">
                No hay {tablename}
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr
                key={item.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                {items.map((key, index) => (
                  <td key={index} className="p-3">
                    {item[key]}
                  </td>
                ))}
                <td className="p-3">
                  <Link href={`/dashboard/${table}/${item.id}`}>Editar</Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-between mt-4 items-center">
        <select onChange={handlePerPage} value={perPage} className="mr-4">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>

        <nav>
          <ul className="flex items-center -space-x-px">
            <li>
              <a
                onClick={(e) => handlePageClick(e, currentPage - 1)}
                className={`px-4 h-10 ${prevDisabled ? "opacity-50 pointer-events-none" : ""}`}
              >
                <FaArrowLeft />
              </a>
            </li>

            {renderPages()}

            <li>
              <a
                onClick={(e) => handlePageClick(e, currentPage + 1)}
                className={`px-4 h-10 ${nextDisabled ? "opacity-50 pointer-events-none" : ""}`}
              >
                <FaArrowRight />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
