import { Link, useNavigate } from 'react-router-dom'
import './3DPopUpCard.scss'

const PopUpCard3D = (props) => {
    const navigate = useNavigate()
    const handleTouchStart = (link) => {
        navigate(link)
    }

    return (
        <div className="card3d">
            <h3>{props.title}</h3>
            <p>{props.content}</p>
            {props.link ? (
                <Link
                    className="link-btn"
                    to={props.link}
                    onTouchStart={() => handleTouchStart(props.link)}
                >
                    Voir la page
                </Link>
            ) : (
                ''
            )}
        </div>
    )
}

export default PopUpCard3D
