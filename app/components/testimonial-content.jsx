'use client'
import React, { useRef, useState, useEffect } from "react";
import { Transition } from "@headlessui/react";

export default function TestimonialContent({testimonials}){

    const [active, setActive] = useState(0);
    const [autorotate] = useState(true);
    const [autorotateTiming] = useState(5000);
    const testimonialsRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    const heightFix = () => {
        if (testimonialsRef.current && testimonialsRef.current.parentElement) {
            testimonialsRef.current.parentElement.style.height = `${testimonialsRef.current.clientHeight}px`;
        }
    };

    useEffect(() => {
        heightFix();
    }, [active]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Define mobile if screen width < 960px
        };

        // Check initial screen size
        handleResize();

        // Listen for window resize events
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Auto-rotate logic
    useEffect(() => {
        if (autorotate) {
            const interval = setInterval(() => {
                setActive((prev) => (prev + 1) % testimonials.length); // Rotar uno por uno
            }, autorotateTiming);

            return () => clearInterval(interval);
        }
    }, [autorotate, autorotateTiming, testimonials.length]);

    // Helper function to get visible testimonials based on screen size
    const getVisibleTestimonials = () => {
        if (isMobile) {
            return [testimonials[active]];
        }
        const firstIndex = active;
        const secondIndex = (active + 1) % testimonials.length;
        return [testimonials[firstIndex], testimonials[secondIndex]];
    };

    const visibleTestimonials = getVisibleTestimonials();

    return (
        <div className=" px-4 md:px-8 transition-all duration-150 delay-300 ease-in-out">
            <div className="relative flex flex-col items-center" ref={testimonialsRef}>
                
                {visibleTestimonials.slice(0, 1).map((testimonial, index) => (
                    <Transition
                        as="div"
                        key={index}
                        show={true}
                        enter="transition ease-in-out duration-500 delay-200 order-first"
                        enterFrom="-translate-x-full opacity-0"  // Inicia fuera de la pantalla a la izquierda
                        enterTo="translate-x-0 opacity-100"      // Se desliza a su posición original
                        leave="transition ease-in-out duration-500 delay-200 absolute"
                        leaveFrom="translate-x-0 opacity-100"     // Comienza en su posición original
                        leaveTo="translate-x-full opacity-0"      // Se desliza fuera de la pantalla a la derecha
                        beforeEnter={() => heightFix()}
                        className="block md:hidden w-full mb-4 text-center"
                    >
                        <div className="">
                            <p>&ldquo;{testimonial.testimonio}&rdquo;</p>
                            <h3 className="font-semibold mt-4">{testimonial.autor}</h3>
                        </div>
                    </Transition>
                ))}

                <div className="hidden md:flex  w-full justify-center space-x-12">
                    {visibleTestimonials.map((testimonial, index) => (
                        <Transition
                            as="div"
                            key={index}
                            show={true}
                            enter="transition ease-in-out duration-500 delay-200 order-first"
                            enterFrom="-translate-x-full opacity-0"  // Inicia fuera de la pantalla a la izquierda
                            enterTo="translate-x-0 opacity-100"      // Se desliza a su posición original
                            leave="transition ease-in-out duration-500 delay-200 absolute"
                            leaveFrom="translate-x-0 opacity-100"     // Comienza en su posición original
                            leaveTo="translate-x-full opacity-0"      // Se desliza fuera de la pantalla a la derecha
                            beforeEnter={() => heightFix()}
                            className="w-1/2 text-center"
                        >
                            <div className="">
                                <p>&ldquo;{testimonial.testimonio}&rdquo;</p>
                                <h3 className="font-semibold mt-4">{testimonial.autor}</h3>
                            </div>
                        </Transition>
                    ))}
                </div>

            </div>
        </div>
    )
}