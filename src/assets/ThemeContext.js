import React, { createContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(true)

    useEffect(() => {
        const savedMode = localStorage.getItem('mode')
        if (savedMode === 'dark') {
            setIsDark(true)
        } else {
            setIsDark(false)
        }
    }, [])

    const toggleTheme = () => {
        const newMode = !isDark
        setIsDark(newMode)
        localStorage.setItem('mode', newMode ? 'dark' : 'light')
    }

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeProvider, ThemeContext }
