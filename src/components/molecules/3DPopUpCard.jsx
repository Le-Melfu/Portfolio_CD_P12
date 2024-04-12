import { Link } from 'react-router-dom'
import './3DPopUpCard.scss'

const PopUpCard3D = (props) => {
    return (
        <div className="card3d">
            <h3>{props.title}</h3>
            <p>{props.content}</p>
            {props.link ? (
                <Link className="link-btn" to={props.link}>
                    Voir la page
                </Link>
            ) : (
                ''
            )}
        </div>
    )
}

export default PopUpCard3D
