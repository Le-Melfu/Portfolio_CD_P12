import { Link } from 'react-router-dom'
import './aside.scss'
import { useContext } from 'react'
import { ProjectsContext } from '../../assets/projectContext'
import LoadingCircle from '../atoms/loadingCircle'

const Aside = ({ onSelectProject }) => {
    const { projects, loading } = useContext(ProjectsContext)
    const recentProjects = Array.from(projects.slice(-3))

    return (
        <aside className="aside">
            <h2 className="aside__title">Projets récents</h2>
            <ul className="aside__list">
                {loading ? <LoadingCircle /> : ''}
                {recentProjects
                    .map((project) => (
                        <li
                            key={project.id}
                            onClick={() => onSelectProject(project)}
                        >
                            {project.title}
                        </li>
                    ))
                    .reverse()}
            </ul>
            <Link className="link-btn" to="/projects">
                Voir +
            </Link>
        </aside>
    )
}

export default Aside
