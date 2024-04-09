import { Link } from 'react-router-dom'
import { projects } from '../assets/datas'
import Article from '../components/molecules/article'
import './projectsPage.scss'

const ProjectPage = () => {
    return (
        <div className="projects">
            <div>
                <h1>Mes Realisations</h1>
                <div className="colorband-fat"></div>
            </div>

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
        </div>
    )
}

export default ProjectPage
