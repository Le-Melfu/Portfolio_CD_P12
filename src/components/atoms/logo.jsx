import { useMediaQuery } from 'react-responsive'
import logoDesktop from '../../assets/icons/logo-clem.webp'
import logoMobile from '../../assets/icons/logo-clem-mobile.webp'
import './logo.scss'
import logoDark from '../../assets/icons/logo-clem-dark.png'
import { useContext } from 'react'
import { ThemeContext } from '../../assets/ThemeContext'

const Logo = ({ force }) => {
    const isMobile = useMediaQuery({ maxWidth: 769 })
    const logo = isMobile ? logoMobile : logoDesktop
    const { isDark } = useContext(ThemeContext)

    return (
        <>
            <img
                src={force === 'dark' ? logo : isDark ? logo : logoDark}
                alt="Logo de Clément Degardenzi"
                className="logo"
            />
            <h1 className="hidden" aria-hidden>
                Clément Degardenzi
            </h1>
        </>
    )
}

export default Logo
