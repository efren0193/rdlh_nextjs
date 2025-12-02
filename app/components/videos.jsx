"use client";
import React from "react";

export default function Videos({ videos = [] }) {

  if (!Array.isArray(videos) || videos.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 py-4">
        No hay videos disponibles.
      </p>
    );
  }

  return (
    <div className="my-8">
      <h3 className="text-xl font-semibold text-dark dark:text-light mb-4">
        Videos
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {videos.map((videoId, index) => (
          <div key={index} className="relative w-full pt-[56.25%] rounded-lg overflow-hidden shadow-lg">
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={`YouTube video ${index}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}
