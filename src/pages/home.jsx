import { useEffect, useState } from 'react'
import Article from '../components/molecules/article'
import Aside from '../components/molecules/aside'
import Carousel from '../components/molecules/carousel'
import './home.scss'
import { Link } from 'react-router-dom'

const Home = () => {
    const [selectedArticle, setSelectedArticle] = useState(null)
    const [showArrow, setShowArrow] = useState(false)
    const [animationClass, setAnimationClass] = useState('')

    const openArticle = (selectedProject) => {
        setSelectedArticle(selectedProject)
    }
    const defaultArticle = {
        title: 'Bienvenue',
        desc: [
            `Mon nom est Clément Degardenzi, je suis intégrateur
                    développeur front-end, situé dans le Nord de la
                    France. Durant ma formation et ma pratique, j’ai pu
                    expérimenter et m’améliorer sur différents aspects
                    du front-end, avec des bases en HTML/CSS/JS, mais
                    également des outils tels que React et Redux
                    Toolkit.`,
            `Je suis féru de perfection de précision, tout en
                    pouvant proposer la meilleure optimisation possible
                    de vos interfaces.`,
        ],
    }

    const resetClass = async () => {
        setTimeout(async () => {
            await setAnimationClass('')
        }, 1000)
    }

    useEffect(() => {
        setShowArrow(selectedArticle !== null)
        if (selectedArticle === null) {
            resetClass()
            setAnimationClass('fade-in')
        } else {
            resetClass()
            setAnimationClass(`slide-in`)
        }
    }, [selectedArticle])

    return (
        <div>
            <Carousel />
            <div className="content-container">
                <section className={`articles-container ${animationClass}`}>
                    {showArrow && (
                        <i
                            className="fa-solid fa-chevron-left arrow"
                            onClick={() => openArticle(null)}
                        ></i>
                    )}
                    <Article
                        title={
                            selectedArticle === null
                                ? defaultArticle.title
                                : selectedArticle.title
                        }
                    >
                        <div>
                            {selectedArticle === null
                                ? defaultArticle.desc.map((p, index) => (
                                      <p key={index}>{p}</p>
                                  ))
                                : selectedArticle.desc.map((p, index) => (
                                      <p key={index}>{p}</p>
                                  ))}
                            {selectedArticle !== null ? (
                                <Link to={selectedArticle.url}>
                                    Voir le site
                                </Link>
                            ) : (
                                ''
                            )}
                        </div>
                    </Article>
                </section>
                <Aside onClick={openArticle} />
            </div>
        </div>
    )
}

export default Home
