import { useMediaQuery } from 'react-responsive'
import LogoBand from '../molecules/logoBand'
import Navbar from '../molecules/navbar'
import NavbarMobile from '../molecules/navbar-mobile'
import { useContext } from 'react'
import { ThemeContext } from '../../assets/ThemeContext'
import MaltBtn from '../atoms/maltBtn'
import './header.scss'
import backgroundGif from '../../assets/videos/3.gif'

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
            <MaltBtn />
            <div className="background-animation background-animation--left">
                <img src={backgroundGif} alt="Animation"></img>
            </div>
            <div className="background-animation background-animation--right">
                <img src={backgroundGif} alt="Animation"></img>
            </div>
        </header>
    )
}

export default Header
