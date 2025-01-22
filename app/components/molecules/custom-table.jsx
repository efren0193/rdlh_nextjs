import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function CustomTable({
  data,
  items,
  headers,
  table,
  limit,
  setLimit,
  total,
  loading,
  fetchPageData,
  currentPage,
}) {
  const [perPage, setPerPage] = useState(limit);
  const [pages, setPages] = useState(0);

  // 🔄 Calcular el número de páginas
  useEffect(() => {
    setPages(Math.ceil(total / perPage));
  }, [total, perPage]);

  // 📋 Cambiar el número de elementos por página
  const handlePerPage = (e) => {
    const newLimit = Number(e.target.value);
    setPerPage(newLimit);
    setLimit(newLimit);
  };

  // 📋 Cambiar de página
  const handlePageClick = async (e, pageNumber) => {
    e.preventDefault();
    if (pageNumber !== currentPage) {
      await fetchPageData(pageNumber);
    }
  };

  // 📄 Renderizar los botones de paginación
  const renderPages = () =>
    Array.from({ length: pages }).map((_, index) => (
      <li key={index}>
        <a
          onClick={(e) => handlePageClick(e, index + 1)}
          className={`flex items-center justify-center px-4 h-10 leading-tight ${
            currentPage === index + 1
              ? "text-blue-600 bg-blue-50 border-blue-300"
              : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          }`}
        >
          {index + 1}
        </a>
      </li>
    ));

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
                No hay proyectos
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
      <div className="flex justify-between mt-4">
        <select onChange={handlePerPage} value={perPage}>
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
                className={`px-4 h-10 ${
                  currentPage === 1 ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <FaArrowLeft />
              </a>
            </li>
            {renderPages()}
            <li>
              <a
                onClick={(e) => handlePageClick(e, currentPage + 1)}
                className={`px-4 h-10 ${
                  currentPage === pages ? "opacity-50 pointer-events-none" : ""
                }`}
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