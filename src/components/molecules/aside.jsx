import { Link, useNavigate } from 'react-router-dom'
import { projects } from '../../assets/datas'
import './aside.scss'

const Aside = ({ onClick }) => {
    const recentProjects = Array.from(projects.slice(-3))
    const navigate = useNavigate()
    const handleTouchStart = (link) => {
        navigate(link)
    }
    const handleClick = (project, index) => {
        onClick(project, index)
    }
    return (
        <aside className="aside">
            <h2 className="aside__title">Projets récents</h2>
            <ul className="aside__list">
                {recentProjects
                    .map((project) => (
                        <li
                            key={project.id}
                            onClick={() => handleClick(project)}
                            onTouchStart={() => handleClick(project)}
                        >
                            {project.title}
                        </li>
                    ))
                    .reverse()}
            </ul>
            <Link
                className="link-btn"
                to="/projects"
                onTouchStart={() => handleTouchStart('/projects')}
            >
                Voir +
            </Link>
        </aside>
    )
}

export default Aside
