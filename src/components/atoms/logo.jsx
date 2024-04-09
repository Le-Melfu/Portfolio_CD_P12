import logo from '../../assets/icons/logo-clem.png'
import './logo.scss'

const Logo = () => {
    return (
        <>
            <img src={logo} alt="Logo de Clément Degardenzi" className="logo" />
            <h1 className="hidden" aria-hidden>
                Clément Degardenzi
            </h1>
        </>
    )
}

export default Logo
