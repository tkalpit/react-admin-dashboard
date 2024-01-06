import Header from "../Header/Header";
import banner from '../../../utils/banner.jpeg';
import "./Home.scss";
const Home = () => {
    return (
        <section className="home-wrapper">
            <Header/>
            <main>
                <img src={banner} alt="banner" />
            </main>
        </section>
    )
}
export default Home;