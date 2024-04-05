import Logo from '../atoms/logo'
import './logoBand.scss'

const LogoBand = () => {
    return (
        <div className="logo-band">
            <Logo />
            <div className="colorband"></div>
        </div>
    )
}

export default LogoBand
