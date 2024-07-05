import { useContext } from 'react'
import './footer.scss'
import { ThemeContext } from '../../assets/ThemeContext'

const Footer = () => {
    const { isDark } = useContext(ThemeContext)

    return (
        <footer className={`${isDark ? '' : 'light'}`}>
            <p>Clément Degardenzi</p>
            <a className="mailTo" href="mailto:degardenzi.clement@gmail.com">
                degardenzi.clement@gmail.com
            </a>
        </footer>
    )
}

export default Footer
