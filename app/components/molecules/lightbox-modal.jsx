"use client";

import React, { useState, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Modal from 'react-modal';
import Image from 'next/image';

export default function LightboxModal({ 
  isOpen, 
  onRequestClose, 
  imageUrl, 
  showPrevious, 
  showNext 
}) {

  const [isLoading, setIsLoading] = useState(true);
  const [imgStyle, setImgStyle] = useState({ maxWidth: '100%', maxHeight: '100%' });

  // Necesario en Next.js 14 App Router
  useEffect(() => {
    if (typeof window !== "undefined") {
      Modal.setAppElement(document.body);
    }
  }, []);

  // Detectar cambio de imagen → activar loader
  useEffect(() => {
    if (imageUrl) {
      setIsLoading(true);
    }
  }, [imageUrl]);

  const handleImageLoad = (e) => {
    const img = e.target;
    const screenH = window.innerHeight;
    const screenW = window.innerWidth;

    if (img.naturalHeight > screenH) {
      setImgStyle({ maxWidth: "100%", maxHeight: "90vh" });
    } else if (img.naturalWidth > screenW) {
      setImgStyle({ maxWidth: "90vw", maxHeight: "100%" });
    } else {
      setImgStyle({ maxWidth: "100%", maxHeight: "100%" });
    }

    // Quitar loader cuando la imagen se cargue
    setIsLoading(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="
        fixed -translate-x-2/4 -translate-y-1/2 top-1/2 left-1/2 bg-transparent
        rounded-lg p-5 w-full max-w-3xl max-h-[90vh] z-50 overflow-hidden
      "
      overlayClassName="overlay"
    >

      {/* Botón cerrar */}
      <button
        onClick={onRequestClose}
        className="absolute top-3 right-3 bg-none border-none text-white text-2xl cursor-pointer z-50"
      >
        X
      </button>

      {/* Imagen */}
      <div className="relative flex justify-center items-center h-full max-h-full">

        {/* Loader cuando la imagen carga */}
        {isLoading && (
          <div className="absolute flex items-center justify-center">
            <AiOutlineLoading3Quarters className="animate-spin text-white" size={35} />
          </div>
        )}

        {/* Imagen real */}
        {imageUrl && (
          <Image
            src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}w_1200/${imageUrl}`}
            alt=""
            className={`block m-auto object-contain rounded-md transition-opacity duration-300 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
            style={imgStyle}
            onLoad={handleImageLoad}
            width={1200}
            height={800}
          />
        )}
      </div>

      {/* Botón anterior */}
      <button
        className={`absolute left-3 top-1/2 bg-black text-white p-2 opacity-70 hover:opacity-100 z-50 transform -translate-y-1/2 ${
          isLoading ? "cursor-not-allowed opacity-40" : ""
        }`}
        onClick={!isLoading ? showPrevious : null}
      >
        <MdChevronLeft size={30} />
      </button>

      {/* Botón siguiente */}
      <button
        className={`absolute right-3 top-1/2 bg-black text-white p-2 opacity-70 hover:opacity-100 z-50 transform -translate-y-1/2 ${
          isLoading ? "cursor-not-allowed opacity-40" : ""
        }`}
        onClick={!isLoading ? showNext : null}
      >
        <MdChevronRight size={30} />
      </button>
    </Modal>
  );
}
