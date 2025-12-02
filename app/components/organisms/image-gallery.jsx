import { useState } from "react";
import { FaPlusSquare } from "react-icons/fa";
import CustomSpin from "../atoms/custom-spin";
import { FaTrash } from "react-icons/fa";

export default function ImageGallery({ images, onUpload, loading=false, loadingDelete=false, onImgDelete }) {

    const [hoverIndex, setHoverIndex] = useState(null);

    return (
      <div className="my-8">
        <label className="block mb-2 font-bold text-gray-700">Imágenes</label>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,2fr))] gap-4">
          {images?.map((img, i) => (
            <div key={i} className="relative border flex justify-center items-center 
            bg-center rounded-lg overflow-hidden shadow-md hover:shadow-xl cursor-pointer"
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
            >

              {/* 🔥 Overlay oscuro al hacer hover */}
              {hoverIndex === i && (
                <div className="absolute inset-0 bg-black/40 z-20 transition-all"></div>
              )}
              
              {/* Trash Icon */}
              {hoverIndex === i && (
                loadingDelete ? (
                  <div className="absolute z-30">
                    <CustomSpin />
                  </div>
                ) : (
                  <button
                    onClick={(e) => onImgDelete(e, img)} 
                    className="absolute text-white bg-black/50 p-2 rounded-full z-20"
                  >
                    <FaTrash />
                  </button>
                )
              )}
              
              {/* Fondo desenfocado */}
              <div
                className="absolute inset-0 bg-cover bg-center blur-lg"
                style={{
                  backgroundImage: `url(${process.env.NEXT_PUBLIC_CLOUDINARY_URL}c_thumb,w_100/${img})`,
                }}
              ></div>
              {/* Imagen nítida en primer plano */}
              <div
                className="relative h-40 w-40 bg-cover bg-center rounded-lg z-10"
                style={{
                  backgroundImage: `url(${process.env.NEXT_PUBLIC_CLOUDINARY_URL}c_thumb,w_300/${img})`,
                }}
              ></div>
            </div>
          ))}
          {
            loading ? (
              <label className="relative border flex justify-center items-center 
              bg-center rounded-lg overflow-hidden shadow-md hover:shadow-xl cursor-pointer">
                <CustomSpin block={true} isAdmin={true}/>
              </label>
            ):(
              <label className="relative h-40 border flex justify-center items-center 
              bg-center rounded-lg overflow-hidden shadow-md hover:shadow-xl cursor-pointer">
                  {/* <div
                    className="h-40 w-full rounded-lg cursor-pointer flex justify-center items-center"
                  > */}
                  <FaPlusSquare size={100} className="opacity-30"/>
                  {/* </div> */}
                  <input 
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={onUpload}
                />
              </label>
            )
          }
          
        </div>
      </div>
    );
  }