"use client";
import { useEffect, useRef, useState } from "react";
import Loader from "./atoms/loader";

export default function IframeHtmlViewer({ html }) {
    const [loading, setLoading] = useState(true);
  const iframeRef = useRef(null);

  const getDarkMode = () => {
    return document.documentElement.classList.contains("dark");
  };

  const adjustHeight = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument || iframe.contentWindow.document;

    setTimeout(() => {
      iframe.style.height = doc.body.scrollHeight + "px";
    }, 50);
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument || iframe.contentWindow.document;
    const isDark = getDarkMode();

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html class="${isDark ? "dark" : ""}">
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
              transition: background 0.3s ease, color 0.3s ease;
            }
            body { background: #ffffff; color: #000000; }
            html.dark body { background: #0a0a0a; color: #e5e5e5; }

            html.dark h1,
            html.dark h2,
            html.dark h3,
            html.dark p,
            html.dark span,
            html.dark div {
              color: #e5e5e5 !important;
            }

            /* Evita márgenes indeseados del editor */
            body > *:first-child { margin-top: 0; }
          </style>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `);
    doc.close();

    // Ajustar altura inicial
    adjustHeight();

    // Detectar cambios del DOM del iframe (por si hay imágenes que cargan más tarde)
    const resizeObserver = new MutationObserver(() => adjustHeight());
    resizeObserver.observe(doc.body, { childList: true, subtree: true });

    // Detectar cambio de modo oscuro en el sitio
    const themeObserver = new MutationObserver(() => {
      const newIsDark = getDarkMode();
      doc.documentElement.classList.toggle("dark", newIsDark);
      adjustHeight();
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      resizeObserver.disconnect();
      themeObserver.disconnect();
    };
  }, [html]);

  return (
    <>
        {loading && <Loader />}

        <iframe
        ref={iframeRef}
        className="w-full border-0 p-0 m-0"
        style={{height: "auto", overflow: "visible" }}
        sandbox="allow-same-origin allow-scripts"
        onLoad={() => setLoading(false)}
        />
    </>
  );
}
