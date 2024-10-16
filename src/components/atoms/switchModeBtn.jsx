import { useContext } from 'react'
import './switchModeBtn.scss'
import { ThemeContext } from '../../assets/ThemeContext'

const DarkModeBtn = ({ className }) => {
    const { isDark, toggleTheme } = useContext(ThemeContext)

    return (
        <div className={`toggle-slider ${className}`}>
            <div className="toggle-slider">
                <input
                    type="checkbox"
                    id="toggle"
                    checked={isDark}
                    onChange={toggleTheme}
                />
                <label htmlFor="toggle" className="slider" />
            </div>
        </div>
    )
}

export default DarkModeBtn
