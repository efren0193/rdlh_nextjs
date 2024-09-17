'use client'
import { useState, useEffect } from "react";
import { getTrabajos } from "../services";
import CustomButton from "./atoms/custom-button";
import Card from "./molecules/card";
import { PulseAnimation } from "./atoms/pulse-animation";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadmore, setLoadmore] = useState(false);
    const [lastDoc, setLastDoc] = useState(null); // Guardamos la referencia al último documento cargado
    const [noMorePosts, setNoMorePosts] = useState(false); // Indicamos si no hay más posts por cargar

    const loadInitialPosts = async () => {
        setLoading(true);
        const { newPosts, lastVisible } = await getTrabajos(6, null); // No pasamos `startAfter` en la primera carga
        setPosts(newPosts);
        setLastDoc(lastVisible); // Guardamos el último documento
        setLoading(false);
    };

    useEffect(() => {
        loadInitialPosts();
    }, []);

    const loadMorePosts = async () => {
        if (!lastDoc || noMorePosts) return;

        setLoadmore(true);
        const { newPosts, lastVisible } = await getTrabajos(3, lastDoc); // Usamos el último documento como cursor
        if (newPosts.length === 0) {
            setNoMorePosts(true); // Si no hay más posts, detenemos la carga
        } else {
            setPosts(prevPosts => [...prevPosts, ...newPosts]); // Concatenamos los nuevos posts
            setLastDoc(lastVisible); // Actualizamos el último documento
        }
        setLoadmore(false);
    };

    const renderLoading = () => {
        return (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 justify-center mb-8">
                {[1, 2, 3].map(element => <PulseAnimation key={element} />)}
            </div>
        );
    };

    return (
        <div className={`pb-4 py-4 md:py-0`}>
            <div className="px-4 sm:px-8 md:max-w-screen-md lg:max-w-screen-lg m-auto pb-8">
                {loading ? renderLoading() : (
                    <>
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 justify-center mb-8">
                            {posts.map((post) => (
                                <div key={post.id} className="flex">
                                    <Card
                                        type={post.images.length > 0 ? 'image' : 'video'}
                                        image={post.images.length > 0 ? post.images[0] : post.videos[0]}
                                        name={post.name}
                                        description={post.shortDescription}
                                    />
                                </div>
                            ))}
                        </div>
                        {loadmore && renderLoading()}
                        {!noMorePosts && (
                            <div className="flex justify-center lg:justify-end">
                                <CustomButton
                                    text={'Cargar más elementos'}
                                    onClick={loadMorePosts}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Posts;