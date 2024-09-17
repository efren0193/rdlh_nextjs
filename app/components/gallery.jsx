'use client'
import { useState } from "react";
import LightboxModal from "./molecules/lightbox-modal";

export default function Gallery({ servicioResponse }) {
    const { images } = servicioResponse;
    const imageCount = images.length;

    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [modalImage, setModalImage] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleImageClick = (index) => {
      setCurrentImageIndex(index)
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsOpen(false);
    };

      // Mostrar la imagen anterior
    const showPrevious = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    // Mostrar la siguiente imagen
    const showNext = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };
  
    return (
      <>
        {imageCount > 0 && (
          <div className="my-8">
            <hr />
            <h3 className="text-3xl text-dark dark:text-secondary my-4 text-center">
              Galería
            </h3>
  
            {/* Masonry Grid */}
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
              {images.map((img, i) => {
                const isLargeImage = i % 5 === 0 && imageCount > 3; // Imágenes más grandes cada 5 elementos
  
                return (
                  <div
                    key={i}
                    className={`w-full mb-4 relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out
                      hover:transform hover:ease-in-out hover:scale-105
                      ${isLargeImage ? "break-inside-avoid" : "break-inside-auto"}`}
                    style={{
                      backgroundImage: `url(${process.env.NEXT_PUBLIC_CLOUDINARY_URL}c_thumb,w_600/${img})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      aspectRatio: isLargeImage ? "16/9" : "4/3", // Aspect ratio dinámico
                      height: isLargeImage ? "400px" : "auto",
                    }}
                    onClick={() => handleImageClick(i)}
                  ></div>
                );
              })}
            </div>
            <LightboxModal
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
              imageUrl={images[currentImageIndex]}
              showPrevious={showPrevious}
              showNext={showNext}
            />
          </div>
        )}
      </>
    );
  }