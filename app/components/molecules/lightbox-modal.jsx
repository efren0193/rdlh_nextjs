import React, { useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Modal from 'react-modal';

// Modal.setAppElement('#__next'); // Ajusta el selector según tu configuración

export default function LightboxModal({ isOpen, onRequestClose, imageUrl, showPrevious, showNext }) {
  const [imgStyle, setImgStyle] = useState({ maxWidth: '100%', maxHeight: '100%' });

  // Función que ajusta el tamaño de la imagen basada en su altura y ancho
  const handleImageLoad = (e) => {
    const img = e.target;
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;

    // Si la imagen es más alta que la ventana, ajusta el contenedor
    if (img.naturalHeight > screenHeight) {
      setImgStyle({ maxWidth: '100%', maxHeight: '90vh' }); // Limita la altura
    } else if (img.naturalWidth > screenWidth) {
      setImgStyle({ maxWidth: '90vw', maxHeight: '100%' }); // Limita el ancho
    } else {
      setImgStyle({ maxWidth: '100%', maxHeight: '100%' }); // Imagen pequeña, se muestra completa
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Lightbox"
      className="
        fixed -translate-x-2/4 -translate-y-1/2 top-1/2 left-1/2 bg-transparent
        rounded-lg p-5 w-full max-w-3xl max-h-[90vh] z-50 overflow-hidden
      "
      overlayClassName="overlay"
    >
      {/* Botón de cerrar */}
      <button
        onClick={onRequestClose}
        className="
          absolute top-3 right-3 bg-none border-none text-white
          text-2xl cursor-pointer z-50
        "
      >
        X
      </button>

      {/* Imagen que se ajusta dinámicamente */}
      <div className="relative flex justify-center items-center h-full max-h-full">
        {
          !imageUrl ? 
          <div class="animate-spin text-white">
            <AiOutlineLoading3Quarters size={'30'}/>
          </div>
          :
          <img
            src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}w_1200/${imageUrl}`}
            alt="Lightbox Image"
            className="block m-auto object-contain rounded-md"
            style={imgStyle}
            onLoad={handleImageLoad} 
          />
        }
      </div>

      {/* Botón anterior */}
      <button
        className="absolute left-3 top-1/2 bg-black text-white p-2 opacity-70 hover:opacity-100 z-50 transform -translate-y-1/2"
        onClick={showPrevious}
      >
        <MdChevronLeft size={'30'} />
      </button>

      {/* Botón siguiente */}
      <button
        className="absolute right-3 top-1/2 bg-black text-white p-2 opacity-70 hover:opacity-100 z-50 transform -translate-y-1/2"
        onClick={showNext}
      >
        <MdChevronRight size={'30'} />
      </button>
    </Modal>
  );
}