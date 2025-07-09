'use client'
import { useState, useDeferredValue, useEffect, useRef, useCallback } from "react";
import { getTrabajos } from "../services/works";
import { PulseAnimation } from "./atoms/pulse-animation";
import Card from "./molecules/card";
import CustomSearch from "./atoms/custom-search";

const Posts = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const deferredSearchTerm = useDeferredValue(searchTerm);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastDoc, setLastDoc] = useState(null);
    const [noMorePosts, setNoMorePosts] = useState(false);
    const observer = useRef();
    const loadingRef = useRef();
    const timeoutRef = useRef();

    // Función para cargar posts con debounce incorporado
    const loadPosts = useCallback(async (search = '', lastDocParam = null) => {
        setLoading(true);
        const { newPosts, lastVisible } = await getTrabajos(
            lastDocParam ? 3 : 6, // Carga inicial: 6, siguientes: 3
            lastDocParam,
            search
        );
        
        setPosts(prev => lastDocParam ? [...prev, ...newPosts] : newPosts);
        setLastDoc(lastVisible);
        setNoMorePosts(newPosts.length === 0);
        setLoading(false);
    }, []);

    // Efecto para búsquedas (con debounce)
    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            loadPosts(deferredSearchTerm);
        }, deferredSearchTerm ? 300 : 0); // Debounce solo cuando hay término de búsqueda

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [deferredSearchTerm, loadPosts]);

    // Scroll infinito
    useEffect(() => {
        if (loading || noMorePosts) return;

        const observerCallback = (entries) => {
            if (entries[0].isIntersecting) {
                loadMorePosts();
            }
        };

        observer.current = new IntersectionObserver(observerCallback, {
            root: null,
            rootMargin: '100px',
            threshold: 0.1
        });

        if (loadingRef.current) {
            observer.current.observe(loadingRef.current);
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [loading, noMorePosts]);

    const loadMorePosts = useCallback(async () => {
        if (!lastDoc || loading) return;
        await loadPosts(deferredSearchTerm, lastDoc);
    }, [lastDoc, loading, deferredSearchTerm, loadPosts]);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const renderLoading = () => (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 justify-center mb-8">
            {[1, 2, 3].map(element => <PulseAnimation key={element} />)}
        </div>
    );

    return (
        <div className="py-8">
            <div className="px-4 sm:px-8 md:max-w-screen-md lg:max-w-screen-lg m-auto pb-8">
                {/* PRO FEATURE SEARCH SSR */}
                {/* <CustomSearch 
                    onChange={handleChange} 
                    value={searchTerm} 
                /> */} 
                
                {loading && !posts.length ? renderLoading() : (
                    <>
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 mb-8">
                            {posts.map((post) => (
                                <div key={post.id} className="flex justify-center">
                                    <Card
                                        type={post.images.length > 0 ? 'image' : 'video'}
                                        image={post.images.length > 0 ? post.images[0] : post.videos[0]}
                                        name={post.name}
                                        description={post.shortDescription}
                                    />
                                </div>
                            ))}
                        </div>
                        
                        <div ref={loadingRef}>
                            {!noMorePosts && (loading ? renderLoading() : <div className="h-20" />)}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Posts;