import { useLocation, useNavigate } from 'react-router-dom'
import './navbar.scss'
import { useEffect, useState } from 'react'

const NavbarMobile = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isCollapsed, setIsCollapsed] = useState(true)
    const [selectedOption, setSelectedOption] = useState('/')

    useEffect(() => {
        switch (location.pathname) {
            case '/':
                setSelectedOption('Accueil')
                break
            case '/experiences':
                setSelectedOption('Expériences & études')
                break
            case '/projects':
                setSelectedOption('Projets')
                break
            case '/music':
                setSelectedOption('Musique')
                break
            case '/interests':
                setSelectedOption(`Centres d'intérêts`)
                break
            default:
                setSelectedOption('Accueil')
                break
        }
    }, [location.pathname])

    const handleOptionChange = (event) => {
        const selectedPage = event.target
        navigate(selectedPage.value)
        setIsCollapsed(true)
    }

    return (
        <nav className="nav-bar-mobile">
            <div className="nav-dropdown">
                <div
                    className={`nav-dropdown-toggle ${
                        !isCollapsed ? 'hidden' : ''
                    }`}
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    {selectedOption}
                </div>
                {!isCollapsed && (
                    <ul className="nav-dropdown-menu">
                        <li onClick={() => setIsCollapsed(true)}>
                            <i class="fa-solid fa-xmark"></i>
                        </li>
                        <li
                            onClick={() =>
                                handleOptionChange({
                                    target: { value: '/' },
                                })
                            }
                            className={
                                selectedOption === 'Accueil' ? 'active' : ''
                            }
                        >
                            Accueil
                        </li>
                        <li
                            onClick={() =>
                                handleOptionChange({
                                    target: {
                                        value: '/experiences',
                                        title: 'Expériences & études',
                                    },
                                })
                            }
                            className={
                                selectedOption === 'Expériences & études'
                                    ? 'active'
                                    : ''
                            }
                        >
                            Expériences & études
                        </li>
                        <li
                            onClick={() =>
                                handleOptionChange({
                                    target: {
                                        value: '/projects',
                                    },
                                })
                            }
                            className={
                                selectedOption === 'Projets' ? 'active' : ''
                            }
                        >
                            Projets
                        </li>
                        <li
                            onClick={() =>
                                handleOptionChange({
                                    target: {
                                        value: '/music',
                                    },
                                })
                            }
                            className={
                                selectedOption === 'Musique' ? 'active' : ''
                            }
                        >
                            Musique
                        </li>
                        <li
                            onClick={() =>
                                handleOptionChange({
                                    target: {
                                        value: '/interests',
                                    },
                                })
                            }
                            className={
                                selectedOption === `Centres d'intérêts`
                                    ? 'active'
                                    : ''
                            }
                        >
                            Centres d'intérêts
                        </li>
                        {/* <li
                            onClick={() =>
                                handleOptionChange({
                                    target: { value: '/contact' },
                                })
                            }
                            className={
                                selectedOption === '/contact' ? 'active' : ''
                            }
                        >
                            Contact
                        </li> */}
                    </ul>
                )}
            </div>
        </nav>
    )
}

export default NavbarMobile
