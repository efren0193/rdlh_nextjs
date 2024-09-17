import Services from "./components/services";
import Slider from "./components/slider";
import PostsServer from "./home/posts-server";
import Slider1 from "./home/slider1";
import Testimonials from "./home/testimonials";

export default function HomePage() {
    return <div className="dark:bg-dark bg-light"> 
        <Slider 
            title={'Explora, admira y conectate'} 
            subtitle={'Capturamos la belleza de la región huasteca a través de la producción de audio, video y fotografía'}
            main={true}
        />
        <Services main={true}/>
        <Slider1/>
        <PostsServer/>
        <Testimonials/>
    </div>
    
}