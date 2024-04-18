import { Link } from 'react-router-dom'
import { projects } from '../../assets/datas'
import './aside.scss'

const Aside = ({ onSelectProject }) => {
    const recentProjects = Array.from(projects.slice(-3))

    return (
        <aside className="aside">
            <h2 className="aside__title">Projets récents</h2>
            <ul className="aside__list">
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
