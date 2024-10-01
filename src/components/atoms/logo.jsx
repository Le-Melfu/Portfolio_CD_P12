import { useMediaQuery } from 'react-responsive'
import logoDesktop from '../../assets/icons/logo-clem.webp'
import logoMobile from '../../assets/icons/logo-clem-mobile.webp'
import './logo.scss'

const Logo = ({ force }) => {
    const isMobile = useMediaQuery({ maxWidth: 769 })
    const logo = isMobile ? logoMobile : logoDesktop

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
