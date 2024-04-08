import Article from '../components/molecules/article'
import Aside from '../components/molecules/aside'
import Carousel from '../components/molecules/carousel'
import './home.scss'
const Home = () => {
    return (
        <div>
            <Carousel />
            <div className="content-container">
                <section className="articles-container">
                    <Article title="Bienvenue">
                        <p>
                            Mon nom est Clément Degardenzi, je suis intégrateur
                            développeur front-end, situé dans le Nord de la
                            France. Durant ma formation et ma pratique, j’ai pu
                            expérimenter et m’améliorer sur différents aspects
                            du front-end, avec des bases en HTML/CSS/JS, mais
                            également des outils tels que React et Redux
                            Toolkit.
                        </p>
                        <p>
                            Je suis féru de perfection de précision, tout en
                            pouvant proposer la meilleure optimisation possible
                            de vos interfaces.
                        </p>
                    </Article>
                </section>
                <Aside />
            </div>
        </div>
    )
}

export default Home
