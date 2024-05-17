import { useMediaQuery } from 'react-responsive'
import LogoBand from '../molecules/logoBand'
import Navbar from '../molecules/navbar'
import NavbarMobile from '../molecules/navbar-mobile'

const Header = () => {
    const isMobile = useMediaQuery({ maxWidth: 769 })
    return (
        <header>
            <LogoBand />
            {isMobile ? <NavbarMobile /> : <Navbar />}
        </header>
    )
}

export default Header
