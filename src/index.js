import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import Home from './pages/home'
import MusicPage from './pages/musique'
import ErrorPage from './pages/errorPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ExperiencePage from './pages/experiencePage'
import ProjectPage from './pages/projectsPage'
import InterestsPage from './pages/interestsPage'
import ContactPage from './pages/contactPage'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/experiences" element={<ExperiencePage />} />
                <Route path="/projects" element={<ProjectPage />} />
                <Route path="/music" element={<MusicPage />} />
                <Route path="/interests" element={<InterestsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)
