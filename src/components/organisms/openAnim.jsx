import Logo from '../atoms/logo'
import './openAnim.scss'

const OpenAnim = () => {
    return (
        <div className="open-animation__wrapper">
            <div className="open-animation__content">
                <div className="open-animation__logo">
                    <Logo force="dark" />
                </div>
                <div className="open-animation__colorband"></div>
            </div>
        </div>
    )
}

export default OpenAnim
