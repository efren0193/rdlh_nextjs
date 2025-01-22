'use client';

import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { Toaster } from 'sonner';

export default function DashboardLayout({ children }) {
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <html lang="en">
            <body>
                <ThemeProvider attribute="class">
                    <div className="flex">
                        <div className="fixed">
                            <Sidebar 
                                setIsOpen={setIsOpen}
                                isOpen={isOpen}
                            />
                        </div>
                        <main className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
                            <div className="p-4">
                                {children}
                                <Toaster richColors/>
                            </div>
                        </main>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}