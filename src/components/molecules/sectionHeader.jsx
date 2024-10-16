import PropTypes from 'prop-types'
import './sectionHeader.scss'

const SectionHeader = ({ title, desc }) => {
    return (
        <div className="section__header">
            <div className="section__title">
                <h2>{title}</h2>
                <div className="section__title__colorband"></div>
            </div>

            <p>{desc}</p>
        </div>
    )
}

SectionHeader.propTypes = {
    title: PropTypes.string.isRequired,
    desc: PropTypes.string,
}

export default SectionHeader
