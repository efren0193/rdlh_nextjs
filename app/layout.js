import Nabvar from "./components/navbar"
import { ThemeProvider } from "next-themes";
import '../globals.css'
import Footer from "./components/footer";

export const metadata = {
  title: 'RH',
  description: 'Rincon de la Huasteca',
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
