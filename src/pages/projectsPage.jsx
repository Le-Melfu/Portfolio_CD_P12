import { Link } from 'react-router-dom'
import Article from '../components/molecules/article'
import './projectsPage.scss'
import SectionHeader from '../components/molecules/sectionHeader'
import { useEffect, useState } from 'react'

const ProjectPage = () => {
    const [projects, setProjects] = useState([])
    useEffect(() => {
        const fetchProjectsData = async () => {
            try {
                const response = await fetch(
                    'https://api.clementdegardenzi.fr/api/projects'
                )
                const data = await response.json()
                setProjects(data)
            } catch (error) {
                console.error('Error fetching music data:', error)
            }
        }

        fetchProjectsData()
    }, [])
    return (
        <main className="projects page">
            <SectionHeader
                title="Mes Réalisations"
                desc="Découvrez les différents projets que j'ai pu réaliser au cours de ma formation d'intégrateur WEB, ce qui m'a permit d'acquérir des compétences en HTML, CSS, JAVASCRIPT mais également en REACT et REDUX"
            />

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
                                {project.image ? (
                                    <img
                                        className="article__image"
                                        src={project.image}
                                        alt={project.imageAlt}
                                    />
                                ) : (
                                    ''
                                )}
                            </div>
                            <div className="tech">
                                {project.url ? (
                                    <Link
                                        className="project-link"
                                        to={project.url}
                                    >
                                        Voir le site
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
