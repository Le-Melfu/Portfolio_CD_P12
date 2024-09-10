import { Link } from 'react-router-dom'
import Article from '../components/molecules/article'
import './projectsPage.scss'
import SectionHeader from '../components/molecules/sectionHeader'
import { useContext } from 'react'
import { ThemeContext } from '../assets/ThemeContext'
import { useEffect, useState } from 'react'
import ArticleCarousel from '../components/molecules/articleCarousel'
import { useMediaQuery } from 'react-responsive'

const ProjectPage = () => {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [currentModalContent, setCurrentModalContant] = useState()
    useEffect(() => {
        const fetchProjectsData = async () => {
            try {
                setLoading(true)
                const response = await fetch(
                    'https://api.clementdegardenzi.fr/api/projects'
                )
                const data = await response.json()
                setProjects(data)
                setLoading(false)
            } catch (error) {}
        }

        fetchProjectsData()
    }, [])

    const { isDark } = useContext(ThemeContext)

    const openModal = () => {
        setModalIsOpen(true)
    }
    const closeModal = () => {
        setModalIsOpen(false)
    }
    const modalContentSelection = (project) => {
        setCurrentModalContant(project)
    }
    const modalContentClear = () => {
        setCurrentModalContant({})
    }
    const modalLimit = useMediaQuery({ maxWidth: 768 })

    return (
        <main className={`projects page ${isDark ? '' : 'light'}`}>
            {modalIsOpen && !modalLimit && (
                <div className="article__image-modal">
                    <div
                        className="article__image-modal-bg"
                        onClick={closeModal}
                    ></div>
                    <div className="article__image-modal-content">
                        {currentModalContent && (
                            <>
                                <i
                                    class="fa-solid fa-circle-xmark modal-close-btn"
                                    onClick={closeModal}
                                ></i>
                                <ArticleCarousel
                                    project={currentModalContent}
                                    openModal={closeModal}
                                    modalContentSelection={modalContentClear}
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
            <SectionHeader
                title="Mes Réalisations"
                desc="Découvrez les différents projets que j'ai pu réaliser au cours de ma formation d'intégrateur WEB, ce qui m'a permit d'acquérir des compétences en HTML, CSS, JAVASCRIPT mais également en REACT et REDUX"
            />
            {loading ? <p>Chargement en cours...</p> : ''}
            {projects
                .map((project) => (
                    <Article
                        title={project.title}
                        key={project.id}
                        pin={project.pin}
                        pinAlt={project.pinAlt}
                    >
                        <div>
                            <div className="article__content--v">
                                <div>
                                    {project.desc.map((p, index) => (
                                        <p key={index}>{p}</p>
                                    ))}
                                </div>

                                {project.medias && (
                                    <ArticleCarousel
                                        project={project}
                                        openModal={openModal}
                                        modalContentSelection={
                                            modalContentSelection
                                        }
                                    />
                                )}
                            </div>
                            <div className="tech">
                                {project.url ? (
                                    <Link
                                        className="project-link"
                                        to={project.url}
                                    >
                                        {project.urlText}
                                    </Link>
                                ) : (
                                    ''
                                )}
                                <div className="tech-picto__container">
                                    {project.tech
                                        ? project.tech.map((tech, index) => (
                                              <img
                                                  key={index}
                                                  src={tech.img}
                                                  alt={tech.alt}
                                                  className="tech-picto"
                                              />
                                          ))
                                        : ''}
                                </div>
                            </div>
                        </div>
                    </Article>
                ))
                .reverse()}
        </main>
    )
}

export default ProjectPage
