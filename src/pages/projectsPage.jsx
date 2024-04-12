import { Link } from 'react-router-dom'
import { projects } from '../assets/datas'
import Article from '../components/molecules/article'
import './projectsPage.scss'
import SectionHeader from '../components/molecules/sectionHeader'

const ProjectPage = () => {
    return (
        <main className="projects page">
            <SectionHeader
                title="Mes Réalisations"
                desc="Découvrez les différents projets que j'ai pu réaliser au cours de ma formation d'intégrateur WEB, ce qui m'a permit d'acquérir des compétences en HTML, CSS, JAVASCRIPT mais également en REACT et REDUX"
            />

            {projects
                .map((project) => (
                    <Article title={project.title}>
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

                            {project.url ? (
                                <Link to={project.url}>Voir le site</Link>
                            ) : (
                                ''
                            )}
                        </div>
                    </Article>
                ))
                .reverse()}
        </main>
    )
}

export default ProjectPage
