
const CLOUDINARY_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export function buildMetadata({
  title = "Rincón de la Huasteca",
  description = "Capturamos la belleza de la región huasteca a través de la producción de audio, video y fotografía.",
  keywords = [],
  slug = "",
  image = "",
}) {
  const baseUrl = "https://rincondelahuasteca.com"; // <-- cambia tu dominio
  const url = slug ? `${baseUrl}/${slug}` : baseUrl;

  // Imagen por defecto si no se manda una
  const defaultOgImage =
    image
      ? `https://res.cloudinary.com/${CLOUDINARY_NAME}/image/upload/${image}`
      : 'https://res.cloudinary.com/dfmzimnpq/image/upload/v1722544722/rh_fb_pz9mbv.png';

  return {
    title: `${title} | Rincón de la Huasteca`,
    description,
    keywords: [
      "huasteca potosina",
      "audio profesional",
      "video profesional",
      "fotografía",
      "RH Studios",
      ...keywords,
    ],

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: `${title} | Rincón de la Huasteca`,
      description,
      url,
      siteName: "Rincón de la Huasteca",
      type: "website",
      locale: "es_MX",
      images: [
        {
          url: defaultOgImage,
          width: 1200,
          height: 630,
          alt: `${title} | RH Studios`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${title} | RH Studios`,
      description,
      images: [defaultOgImage],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}
