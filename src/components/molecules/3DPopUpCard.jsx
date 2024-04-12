import { Link } from 'react-router-dom'

const PopUpCard3D = (props) => {
    ;<div>
        <h3>{props.title}</h3>
        <p>{props.content}</p>
        {props.link ? <Link to={props.link}>Voir la page</Link> : ''}
    </div>
}

export default PopUpCard3D
