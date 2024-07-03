import Header from "../headerComponent/header";
import MainSection from "../homeS1Component/Home-S1"
import NewArrivals from "../homeS2component/Home-S2"
import Locations from "../homeS3component/Home-S3";
import Varity from "../homeS4component/Home-S4";
import ShopSection from "../homeS5Component/Home-S5";
import ContactFooter from "../homeS6Component/Home-S6";
import Footer from "../homeS7Component/Home-S7";


const Home=()=>{
    return(
        <div>
            <Header/>
            <MainSection/>
            <NewArrivals/>
            <Locations/>
            <Varity/>
            <ShopSection/>
            <ContactFooter/> 
            <Footer/>    
        </div>

    )
}

export default Home;