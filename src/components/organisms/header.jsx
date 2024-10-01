import { useMediaQuery } from 'react-responsive'
import LogoBand from '../molecules/logoBand'
import Navbar from '../molecules/navbar'
import NavbarMobile from '../molecules/navbar-mobile'
import { useContext } from 'react'
import { ThemeContext } from '../../assets/ThemeContext'
import MaltBtn from '../atoms/maltBtn'
import './header.scss'
import mobileLogo from '../../assets/icons/logo_mobile_replacement.png'

const Header = () => {
    const isMobile = useMediaQuery({ maxWidth: 769 })
    const { isDark } = useContext(ThemeContext)

    if (isDark) {
        document.body.classList.remove('light')
    } else {
        document.body.classList.add('light')
    }

    return (
        <header>
            {isMobile ? (
                <img
                    className="mobile-logo-replacer"
                    src={mobileLogo}
                    alt="Logo"
                />
            ) : (
                <LogoBand />
            )}

            {isMobile ? <NavbarMobile /> : <Navbar />}
            <MaltBtn />
        </header>
    )
}

export default Header
