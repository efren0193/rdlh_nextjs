import Card from "../components/molecules/card";
import { db } from "../firebase-config";
import { collection,getDocs, limit, query } from "firebase/firestore";
import Button from "../components/atoms/custom-button";
import { MdArrowForward } from "react-icons/md";
import CustomLink from "../components/atoms/custom-link";

async function loadPosts() {
    const q = query(collection(db, "trabajos"), limit(3));
    const servRef = await getDocs(q);
    const data = [];

    servRef.forEach((doc) => data.push({id: doc.id, ...doc.data()}))
    return data;
}

async function Posts(params) {
    const posts = await loadPosts();
    
    return (
        <div className="bg-white dark:bg-black pb-4 py-4 md:py-0">
            <div className="px-4 sm:px-8 md:max-w-screen-md lg:max-w-screen-lg m-auto pb-8">
                <h3 className="text-3xl text-dark dark:text-secondary my-4 ">Nuestro Trabajo</h3>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 justify-center mb-8">
                    {posts.map((post) => {
                        return <div key={post.id} className="flex">
                            <Card
                                type={post.images.length > 0 ? 'image' : 'video'}
                                image={post.images.length > 0 ? post.images[0] : post.videos[0]}
                                name={post.name}
                                description={post.shortDescription}
                            />
                        </div>
                    })}
                </div>
                <div className="flex justify-center lg:justify-end">
                    <CustomLink
                        text={'Ver mas trabajos'}
                        href={'/trabajos'}
                    />
                </div>
            </div>
        </div>
    )
}

export default Posts;