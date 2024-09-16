import Article from '../components/molecules/article'
import './projectsPage.scss'
import SectionHeader from '../components/molecules/sectionHeader'
import { useContext } from 'react'
import { ThemeContext } from '../assets/ThemeContext'
import { useState } from 'react'
import ArticleCarousel from '../components/molecules/articleCarousel'
import { useMediaQuery } from 'react-responsive'
import { ProjectsContext } from '../assets/projectContext'

const ProjectPage = () => {
    const { projects, loading } = useContext(ProjectsContext)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [currentModalContent, setCurrentModalContant] = useState()

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
        <main className={`projects page fade-in ${isDark ? '' : 'light'}`}>
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
                                    <a
                                        className="project-link"
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {project.urlText}
                                    </a>
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
