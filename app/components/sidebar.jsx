import { FiHome, FiLogOut, FiMessageCircle } from 'react-icons/fi';
import { AiOutlineProject } from 'react-icons/ai';
import Link from 'next/link';
import { toast } from 'sonner';
import { useState } from 'react';

export default function Sidebar({isOpen, setIsOpen}) {
    const [loading, setLoading] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/logout', {
                method: 'POST',
                credentials: 'include',
            });
    
            if (response.ok) {
                window.location.href = '/login';
            } else {
                setLoading(false);
                console.error('Error al hacer logout');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error al cerrar sesión:', error);
            toast.error('Error al cerrar sesión');
        }
    };

    return (
        <div className={`flex flex-col h-screen ${isOpen ? 'w-64' : 'w-20'} bg-gradient-to-r 
            from-dark via-secondaryDark to-secondaryDark  text-white transition-all duration-300`}>
            {/* Header with Toggle */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <span className={`text-lg font-semibold ${!isOpen && 'hidden'}`}>Dashboard</span>
                <button onClick={toggleSidebar} className="focus:outline-none">
                    <span className="text-xl">&#9776;</span> {/* Icono de hamburguesa */}
                </button>
            </div>

            {/* Navigation Items */}
            <nav className="flex-grow">
                <ul className="mt-4 space-y-4">
                    <li className="p-4 hover:bg-dark cursor-pointer">
                        <Link href={'/dashboard'} className='flex items-center'>
                            <FiHome className="text-xl" />
                            {isOpen && <span className="ml-4">Inicio</span>}
                        </Link>
                    </li>
                    <li className="p-4 hover:bg-dark cursor-pointer">
                        <Link href={'/dashboard/works'} className='flex items-center'>
                            <AiOutlineProject className="text-xl" />
                            {isOpen && <span className="ml-4">Trabajos</span>}
                        </Link>
                    </li>
                    <li className="p-4 hover:bg-dark cursor-pointer">
                        <Link href={'/dashboard/testimonials'} className='flex items-center'>
                            <FiMessageCircle className="text-xl" />
                            {isOpen && <span className="ml-4">Testimonios</span>}
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-700">
                <button onClick={handleLogout} className="flex items-center p-4 w-full hover:bg-dark cursor-pointer">
                    <FiLogOut className="text-xl" />
                    {isOpen && <span className="ml-4">Logout</span>}
                </button>
            </div>
        </div>
    );
}