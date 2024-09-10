import Posts from "./home/posts";
import Services from "./components/services";
import Slider from "./components/slider";
import Slider1 from "./home/slider1";
import Testimonials from "./home/testimonials";

export default function HomePage() {
    return <div className="dark:bg-dark bg-light"> 
        <Slider 
            title={'Explora, admira y conectate'} 
            subtitle={'Capturamos la belleza de la región a través de la producción de audio, video y fotografía'}
            main={true}
        />
        <Services main={true}/>
        <Slider1/>
        <Posts/>
        <Testimonials/>
    </div>
    
}