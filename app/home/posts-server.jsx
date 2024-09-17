import CustomLink from "../components/atoms/custom-link";
import Card from "../components/molecules/card";
import { getTrabajos } from "../services";


async function PostsServer() {

    const { newPosts: posts } = await getTrabajos(3);

    return (
        <div className={`pb-4 py-4 md:py-0 bg-white dark:bg-black mt-8`}>
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
                        href={'/producciones'}
                    /> 
                </div>
            </div>
        </div>
    )
}

export default PostsServer;