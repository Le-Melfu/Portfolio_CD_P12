import { Link } from 'react-router-dom'
import { projects } from '../assets/datas'
import Article from '../components/molecules/article'
import './projectsPage.scss'

const ProjectPage = () => {
    return (
        <div className="projects">
            {projects.map((project) => (
                <Article title={project.title}>
                    <div>
                        {project.desc.map((p, index) => (
                            <p key={index}>{p}</p>
                        ))}
                        <Link to={project.url}>Voir le site</Link>
                    </div>
                </Article>
            ))}
        </div>
    )
}

export default ProjectPage
