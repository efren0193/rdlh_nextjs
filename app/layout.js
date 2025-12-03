import { ThemeProvider } from "next-themes";
import '../globals.css'
import { getServiciosForMenu } from "./services/services";
import NabvarServer from "./components/navbar-server";
import Footer from "./components/footer";

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
