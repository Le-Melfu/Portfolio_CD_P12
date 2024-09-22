import { NavLink, useNavigate } from 'react-router-dom'
import './3DPopUpCard.scss'
import { useContext } from 'react'
import { ThemeContext } from '../../assets/ThemeContext'

const PopUpCard3D = (props) => {
    const navigate = useNavigate()
    const handleTouchStart = (link) => {
        navigate(link)
    }
    const { isDark } = useContext(ThemeContext)

    return (
        <div className={`card3d ${isDark ? 'card--dark' : 'card--light'}`}>
            <h3>{props.title}</h3>
            <p>{props.content}</p>
            {props.link ? (
                props.link === '/music' ? (
                    <NavLink className="link-btn" to={props.link}>
                        Voir la page
                    </NavLink>
                ) : (
                    <a
                        className="link-btn"
                        href={props.link}
                        onTouchStart={() => handleTouchStart(props.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Voir la page
                    </a>
                )
            ) : (
                ''
            )}
        </div>
    )
}

export default PopUpCard3D
