import { useMediaQuery } from 'react-responsive'
import LogoBand from '../molecules/logoBand'
import Navbar from '../molecules/navbar'
import NavbarMobile from '../molecules/navbar-mobile'
import { useContext } from 'react'
import { ThemeContext } from '../../assets/ThemeContext'

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
            <LogoBand />
            {isMobile ? <NavbarMobile /> : <Navbar />}
        </header>
    )
}

export default Header
