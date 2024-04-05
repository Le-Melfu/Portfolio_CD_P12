import { Link } from 'react-router-dom'
import './navbar.scss'

const Navbar = () => {
    return (
        <nav className="nav-bar">
            <Link to={'/'} className="nav-btn">
                Home
            </Link>
            <Link to={'/experiences'} className="nav-btn">
                Expériences & études
            </Link>
            <Link to={'/projects'} className="nav-btn">
                Projets
            </Link>
            <Link to={'/music'} className="nav-btn">
                Musique
            </Link>
            <Link to={'/interests'} className="nav-btn">
                Centres d'intérêts
            </Link>
            <Link to={'/contact'} className="nav-btn">
                Contact
            </Link>
        </nav>
    )
}

export default Navbar
