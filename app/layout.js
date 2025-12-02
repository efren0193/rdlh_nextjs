import { ThemeProvider } from "next-themes";
import '../globals.css'
import { getServiciosForMenu } from "./services/services";
import NabvarServer from "./components/navbar-server";
import Footer from "./components/footer";

export const metadata = {
  title: 'Rincón de la Huasteca',
  description: 'Capturamos la belleza de la región huasteca a través de la producción de audio, video y fotografía.',
  other: {
    'google-adsense-account': 'ca-pub-6852951691963940'
  }
}

export default async function RootLayout({ children }) {
  const getServices = await getServiciosForMenu();
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
          <NabvarServer servicios={getServices} />
            {children}
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  )
}
