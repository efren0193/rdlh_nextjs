import Nabvar from "./components/navbar"
import { ThemeProvider } from "next-themes";
import '../globals.css'
import Footer from "./components/footer";

export const metadata = {
  title: 'Rincón de la Huasteca',
  description: 'Capturamos la belleza de la región huasteca a través de la producción de audio, video y fotografía.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
          <Nabvar/>
          {children}
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  )
}
