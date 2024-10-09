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
const Enemy = ({ id, x, y, type, isDestroyed, shield }) => {
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

    useEffect(() => {
        if (isDestroyed) {
            setIsAnimating(true)
            setCurrentSprite(animationSprites[0]) // Start animation with the first sprite
            let frameIndex = 0

            const intervalId = setInterval(() => {
                frameIndex += 1
                if (frameIndex < animationSprites.length) {
                    setCurrentSprite(animationSprites[frameIndex])
                } else {
                    setIsAnimating(false)
                    clearInterval(intervalId) // Stop the animation after last sprite
                    // Optionally reset state
                }
            }, 100) // Adjust this duration for speed of animation

            return () => clearInterval(intervalId) // Cleanup on unmount or when isDestroyed changes
        } else {
            setCurrentSprite(ennemyShip) // Reset to enemy ship if not destroyed
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDestroyed, shield])

    return (
        <div
            className={`enemy ${isAnimating ? 'enemy-destroyed' : ''}`}
            style={{
                left: `${x}px`,
                top: `${y}px`,
            }}
        >
            <p>{type}</p>
            {shield && (
                <img
                    className="enemy-shield"
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
