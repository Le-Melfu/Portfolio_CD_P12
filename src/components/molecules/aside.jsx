import { Link } from 'react-router-dom'
import './aside.scss'
import { useEffect, useState } from 'react'

const Aside = ({ onSelectProject }) => {
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
