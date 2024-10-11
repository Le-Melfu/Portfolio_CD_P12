import { Link, useNavigate } from 'react-router-dom'
import './navbar.scss'
import DarkModeBtn from '../atoms/switchModeBtn'

const Navbar = () => {
    const navigate = useNavigate()
    const handleTouchEnd = (link) => {
        navigate(link)
    }
    const isMobileDevice = () => {
        return /Mobi|Android/i.test(window.navigator.userAgent)
    }

    return (
        <div className="nav-bar__container">
            {!isMobileDevice() ? (
                <Link
                    to={'/game'}
                    className="play-game-btn"
                    onTouchEnd={() => handleTouchEnd('/')}
                >
                    Envie de jouer ?
                </Link>
            ) : (
                ''
            )}
            <nav className="nav-bar">
                <Link
                    to={'/'}
                    className="nav-btn"
                    onTouchEnd={() => handleTouchEnd('/')}
                >
                    Accueil
                </Link>
                <Link
                    to={'/experiences'}
                    className="nav-btn"
                    onTouchEnd={() => handleTouchEnd('/experiences')}
                >
                    Expériences & études
                </Link>
                <Link
                    to={'/projects'}
                    className="nav-btn"
                    onTouchEnd={() => handleTouchEnd('/projects')}
                >
                    Projets
                </Link>
                <Link
                    to={'/music'}
                    className="nav-btn"
                    onTouchEnd={() => handleTouchEnd('/music')}
                >
                    Musique
                </Link>
                <Link
                    to={'/interests'}
                    className="nav-btn"
                    onTouchEnd={() => handleTouchEnd('/interests')}
                >
                    Centres d'intérêts
                </Link>
                {/* <Link to={'/contact'} className="nav-btn">
                Contact
            </Link> */}
            </nav>
            <DarkModeBtn className="slider-desktop" />
        </div>
    )
}

export default Navbar
