import { Link } from 'react-router-dom'
import { projects } from '../../assets/datas'
import './aside.scss'

const Aside = ({ onClick }) => {
    const recentProjects = projects.slice(-3)

    const handleClick = (project) => {
        onClick(project)
    }
    return (
        <aside className="aside">
            <h2 className="aside__title">Projets</h2>
            <ul className="aside__list">
                {recentProjects.map((project) => (
                    <li key={project.id} onClick={() => handleClick(project)}>
                        {project.title}
                    </li>
                ))}
            </ul>
            <Link className="aside__showMore" to="/projects">
                Voir +
            </Link>
        </aside>
    )
}

export default Aside
