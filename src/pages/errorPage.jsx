import React from 'react'
import { Link } from 'react-router-dom'
import './errorPage.scss'

const ErrorPage = () => {
    return (
        <div className="error-page fade-in">
            <h2>404</h2>
            <p>Oups... il semble que cette page n'existe pas !</p>
            <Link to={'/'}>Retourner à la page d'acceuil</Link>
        </div>
    )
}

export default ErrorPage
