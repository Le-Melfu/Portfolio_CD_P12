import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import Home from './pages/home'
import MusicPage from './pages/musique'
import ErrorPage from './pages/errorPage'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ExperiencePage from './pages/experiencePage'
import ProjectPage from './pages/projectsPage'
import InterestsPage from './pages/interestsPage'
import GamePage from './pages/gamePage'
import Header from './components/organisms/header'
import Footer from './components/organisms/footer'
import OpenAnim from './components/organisms/openAnim'
import { ThemeProvider } from './assets/ThemeContext'
import { ProjectsProvider } from './assets/projectContext'
import BackgroundVideo from './components/atoms/backgroundVideo'

const isMobileDevice = () => {
    return /Mobi|Android/i.test(window.navigator.userAgent)
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ProjectsProvider>
                <ThemeProvider>
                    <BackgroundVideo />
                    <OpenAnim />
                    <Header />
                    <div className="main-container">
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route
                                path="/experiences"
                                element={<ExperiencePage />}
                            />
                            <Route path="/projects" element={<ProjectPage />} />
                            <Route path="/music" element={<MusicPage />} />
                            <Route
                                path="/interests"
                                element={<InterestsPage />}
                            />
                            <Route
                                path="/game"
                                element={
                                    isMobileDevice() ? (
                                        <Navigate to="/" /> // Redirection si mobile
                                    ) : (
                                        <GamePage /> // Sinon accès à la page
                                    )
                                }
                            />
                            {/* <Route path="/contact" element={<ContactPage />} /> */}
                            <Route path="*" element={<ErrorPage />} />
                        </Routes>
                    </div>
                    <Footer />
                </ThemeProvider>
            </ProjectsProvider>
        </BrowserRouter>
    </React.StrictMode>
)
