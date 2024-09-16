import React, { createContext, useState, useEffect } from 'react'

export const ProjectsContext = createContext()

export const ProjectsProvider = ({ children }) => {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProjectsData = async () => {
            try {
                const response = await fetch(
                    'https://api.clementdegardenzi.fr/api/projects'
                )
                const data = await response.json()
                setProjects(data)
            } catch (error) {
                console.error('Error fetching projects:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchProjectsData()
    }, [])

    return (
        <ProjectsContext.Provider value={{ projects, loading }}>
            {children}
        </ProjectsContext.Provider>
    )
}
