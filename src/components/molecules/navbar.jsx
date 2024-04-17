import { Link, useNavigate } from 'react-router-dom'
import './navbar.scss'

const Navbar = () => {
    const navigate = useNavigate()
    const handleTouchStart = (link) => {
        navigate(link)
    }

    return (
        <nav className="nav-bar">
            <Link
                to={'/'}
                className="nav-btn"
                onTouchStart={() => handleTouchStart('/')}
            >
                Home
            </Link>
            <Link
                to={'/experiences'}
                className="nav-btn"
                onTouchStart={() => handleTouchStart('/experiences')}
            >
                Expériences & études
            </Link>
            <Link
                to={'/projects'}
                className="nav-btn"
                onTouchStart={() => handleTouchStart('/projects')}
            >
                Projets
            </Link>
            <Link
                to={'/music'}
                className="nav-btn"
                onTouchStart={() => handleTouchStart('/music')}
            >
                Musique
            </Link>
            <Link
                to={'/interests'}
                className="nav-btn"
                onTouchStart={() => handleTouchStart('/interests')}
            >
                Centres d'intérêts
            </Link>
            {/* <Link to={'/contact'} className="nav-btn">
                Contact
            </Link> */}
        </nav>
    )
}

export default Navbar
