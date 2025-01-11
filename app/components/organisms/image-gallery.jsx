import { FaPlusSquare } from "react-icons/fa";

export default function ImageGallery({ images }) {
    return (
      <div className="my-8">
        <label className="block mb-2 font-bold text-gray-700">Imágenes</label>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,2fr))] gap-4">
          {images.map((img, i) => (
            <div key={i} className="relative border flex justify-center items-center 
            bg-center rounded-lg overflow-hidden shadow-md hover:shadow-xl">
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
          <div className="relative border flex justify-center items-center 
            bg-center rounded-lg overflow-hidden shadow-md hover:shadow-xl">
              <div
                className="h-40 w-full rounded-lg cursor-pointer flex justify-center items-center"
              >
                <FaPlusSquare size={100} className="opacity-30"/>
              </div>
            </div>
        </div>
      </div>
    );
  }