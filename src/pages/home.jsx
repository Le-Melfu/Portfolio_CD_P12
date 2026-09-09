import { useContext, useEffect, useState } from 'react'
import Article from '../components/molecules/article'
import Aside from '../components/molecules/aside'
import Carousel from '../components/molecules/carousel'
import './home.scss'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../assets/ThemeContext'

const Home = () => {
    const [selectedArticle, setSelectedArticle] = useState(null)
    const [showArrow, setShowArrow] = useState(false)
    const [animationClass, setAnimationClass] = useState('')
    const { isDark } = useContext(ThemeContext)

    const articleAnchor = document.getElementById('article-anchor')
    const handleAnchor = () => {
        articleAnchor.scrollIntoView({
            block: 'start',
        })
    }

    const openArticle = (selectedProject) => {
        setSelectedArticle(selectedProject)
        handleAnchor()
    }

    const defaultArticle = {
        title: 'Bienvenue',
        desc: [
            `Mon nom est Clément Degardenzi, je suis Software
                    Engineer Full-Stack, situé dans la métropole
                    lilloise. Près de deux ans d’expérience en
                    environnement produit, de la conception à
                    l’implémentation, sur Flutter, TypeScript/Node.js,
                    Firebase/GCP, Java/Spring et React.`,
            `J’ai une appétence pour l’architecture logicielle,
                    les interfaces modulaires et la simplification de
                    systèmes legacy, tout en soignant la précision et
                    l’optimisation des interfaces.`,
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
        <main className={`home fade-in ${isDark ? '' : 'light'}`}>
            <Carousel />
            <div className="content-container">
                <section
                    className={`articles-container ${animationClass}`}
                    id="article-anchor"
                >
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
                <Aside onSelectProject={openArticle} />
            </div>
        </main>
    )
}

export default Home
