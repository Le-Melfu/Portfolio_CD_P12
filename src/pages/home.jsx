import Carousel from '../components/molecules/carousel'
import Header from '../components/organisms/header'
import './home.scss'
const Home = () => {
    return (
        <body>
            <Header />
            <Carousel />
            <section id="section1">
                <div class="bloc-presentation">
                    <div class="presentation">
                        <p>
                            Je m'appelle Clément, j'ai 30 ans et je suis
                            passionné de musique depuis l'âge de 11 ans. Du Rock
                            au Jazz en passant par la Funk et la musique
                            Electro, tous les styles m'intérèssent et
                            m'inspirent, aussi bien sur de vrais instruments
                            qu'en MAO.
                        </p>
                    </div>
                </div>
            </section>
        </body>
    )
}

export default Home
