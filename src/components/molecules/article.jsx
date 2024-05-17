import PropTypes from 'prop-types'
import './article.scss'

const Article = ({ title, children, pin, pinAlt }) => {
    return (
        <div className="article">
            <h2 className="article__title">{title}</h2>
            {pin ? <img className="pin" src={pin} alt={pinAlt} /> : ''}
            <div className="article__content">
                <div className="colorband-v"></div>
                <div className="article__content--v">{children}</div>
            </div>
        </div>
    )
}

Article.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    pin: PropTypes.string,
    pinAlt: PropTypes.string,
}

export default Article
