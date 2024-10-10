import React, { useEffect, useState } from 'react'
import './gameEnnemy.scss'
import ennemyShip from '../../assets/images/gamePageAssets/ennemyShip.png'
import explosion1 from '../../assets/images/gamePageAssets/explosion-1.png'
import explosion2 from '../../assets/images/gamePageAssets/explosion-2.png'
import explosion3 from '../../assets/images/gamePageAssets/explosion-3.png'
import explosion4 from '../../assets/images/gamePageAssets/explosion-4.png'
import explosion5 from '../../assets/images/gamePageAssets/explosion-5.png'
import explosion6 from '../../assets/images/gamePageAssets/explosion-6.png'
import enemyShield from '../../assets/images/gamePageAssets/shield.png'
const Enemy = ({ id, x, y, type, isDestroyed, destructionTimer, shield }) => {
    const animationSprites = [
        explosion1,
        explosion2,
        explosion3,
        explosion4,
        explosion5,
        explosion6,
    ]
    const [currentSprite, setCurrentSprite] = useState(ennemyShip)
    const [isAnimating, setIsAnimating] = useState(false)
    const [currentFrame, setCurrentFrame] = useState(0)
    const [shieldState, setShieldState] = useState(shield)
    const [shieldAnim, setShieldAnim] = useState(false)
    useEffect(() => {
        if (!shield) {
            setShieldAnim(true)
        }
        const timer = setTimeout(() => {
            setShieldState(shield)
            setShieldAnim(false)
        }, 300)

        // Nettoyage du timer lorsque le composant se démonte ou lorsque 'shield' change
        return () => clearTimeout(timer)
    }, [shield])

    useEffect(() => {
        if (isDestroyed) {
            setIsAnimating(true)
            setCurrentFrame(0) // Commencer l'animation à la première frame
            const interval = setInterval(() => {
                setCurrentFrame((prevFrame) => {
                    // Vérifie si nous avons atteint la fin de l'animation
                    if (prevFrame + 1 >= animationSprites.length) {
                        setTimeout(() => {
                            setIsAnimating(false)
                        }, destructionTimer) // Stop l'animation
                        clearInterval(interval) // Nettoie l'intervalle
                        return prevFrame // Ne met pas à jour le frame
                    } else {
                        // Met à jour le sprite pour la frame actuelle
                        setCurrentSprite(animationSprites[prevFrame + 1]) // Passe à la frame suivante
                        return prevFrame + 1 // Met à jour le frame
                    }
                })
            }, 50) // Change sprite toutes les 50ms

            return () => clearInterval(interval) // Nettoyage de l'intervalle
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDestroyed])

    return (
        <div
            className={`enemy ${isAnimating ? 'enemy-destruction' : ''}`}
            style={{
                left: `${x}px`,
                top: `${y}px`,
            }}
        >
            <p>{type}</p>

            {shieldState && !isDestroyed && (
                <img
                    className={` enemy-shield ${
                        shieldAnim ? 'enemy-shield--destroyed' : ''
                    }`}
                    src={enemyShield}
                    alt="bouclier d'énergie"
                />
            )}

            <img
                src={currentSprite}
                alt={isDestroyed ? 'Explosion' : 'Vaisseau ennemi'}
            />
        </div>
    )
}

export default Enemy
