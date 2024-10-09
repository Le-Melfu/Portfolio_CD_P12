import React, { useEffect, useState, useContext } from 'react'
import './gamePage.scss'
import { ThemeContext } from '../assets/ThemeContext'
import spaceshipAsset from '../assets/images/gamePageAssets/vecteezy_spaceship-3d-rendering-icon-illustration_28567053.png'
import Projectile from '../components/atoms/gameProjectile'
import Enemy from '../components/atoms/gameEnnemy'

const GamePage = () => {
    const { isDark } = useContext(ThemeContext)
    const [inputs, setInputs] = useState({
        left: false,
        right: false,
        up: false,
        down: false,
    })

    const [playerPosition, setPlayerPosition] = useState({
        x: window.innerWidth / 2 - 25,
        y: window.innerHeight / 2 - 25,
    })

    const speed = 10
    const [projectiles, setProjectiles] = useState([])
    const [canShoot, setCanShoot] = useState(true) // État pour contrôler le tir
    const challenges = [
        'Debugging',
        'Unit Testing',
        'Optimization',
        'Code Review',
        'Performance Issues',
        'Cross-Browser Compatibility',
    ]
    const [enemies, setEnemies] = useState([])
    const checkCollision = (proj, enemy) => {
        console.log(
            `Projectile: (${proj.x}, ${proj.y}), Enemy: (${enemy.x}, ${enemy.y})`
        )
        return (
            proj.x < enemy.x + 50 && // Largeur de l'ennemi
            proj.x + 4 > enemy.x && // Largeur du projectile
            proj.y < enemy.y + 50 && // Hauteur de l'ennemi
            proj.y + 4 > enemy.y // Hauteur du projectile
        )
    }

    // Gérer les inputs de mouvement
    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.code) {
                case 'ArrowLeft':
                    setInputs((prev) => ({ ...prev, left: true }))
                    break
                case 'ArrowRight':
                    setInputs((prev) => ({ ...prev, right: true }))
                    break
                case 'ArrowUp':
                    setInputs((prev) => ({ ...prev, up: true }))
                    break
                case 'ArrowDown':
                    setInputs((prev) => ({ ...prev, down: true }))
                    break
                default:
                    break
            }
        }

        const handleKeyUp = (event) => {
            switch (event.code) {
                case 'ArrowLeft':
                    setInputs((prev) => ({ ...prev, left: false }))
                    break
                case 'ArrowRight':
                    setInputs((prev) => ({ ...prev, right: false }))
                    break
                case 'ArrowUp':
                    setInputs((prev) => ({ ...prev, up: false }))
                    break
                case 'ArrowDown':
                    setInputs((prev) => ({ ...prev, down: false }))
                    break
                default:
                    break
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    // Gérer l'entrée de tir séparément
    useEffect(() => {
        const handleSpaceDown = (event) => {
            if (event.code === 'Space' && canShoot) {
                setCanShoot(false)
                setProjectiles((prevProjectiles) => [
                    ...prevProjectiles,
                    {
                        x: playerPosition.x + 25,
                        y: playerPosition.y,
                        speed: 10,
                    },
                ])
                setTimeout(() => setCanShoot(true), 50) // Délai de 300 ms
            }
        }

        window.addEventListener('keydown', handleSpaceDown)

        return () => {
            window.removeEventListener('keydown', handleSpaceDown)
        }
    }, [canShoot, playerPosition.x, playerPosition.y])

    // Mettre à jour la position du joueur
    useEffect(() => {
        const movePlayer = () => {
            setPlayerPosition((prevPosition) => {
                let newX = prevPosition.x
                let newY = prevPosition.y

                if (inputs.left) newX -= speed
                if (inputs.right) newX += speed
                if (inputs.up) newY -= speed
                if (inputs.down) newY += speed

                return { x: newX, y: newY }
            })
        }

        const interval = setInterval(movePlayer, 16) // approx. 60 FPS

        return () => clearInterval(interval)
    }, [inputs])

    // Mettre à jour les projectiles
    useEffect(() => {
        const update = () => {
            setProjectiles((prevProjectiles) => {
                const updatedProjectiles = prevProjectiles
                    .map((proj) => ({ ...proj, y: proj.y - proj.speed }))
                    .filter((proj) => proj.y > 0)

                // Vérification des collisions
                setEnemies((prevEnemies) => {
                    return prevEnemies.filter((enemy) => {
                        const hit = updatedProjectiles.some((proj) =>
                            checkCollision(proj, enemy)
                        )
                        return !hit // Retire les ennemis touchés
                    })
                })

                return updatedProjectiles // Retourne les projectiles mis à jour
            })
        }

        const animationFrameId = requestAnimationFrame(update)

        return () => cancelAnimationFrame(animationFrameId)
    }, [projectiles])

    // Gérer les ennemis
    useEffect(() => {
        const spawnEnemy = () => {
            const randomChallenge =
                challenges[Math.floor(Math.random() * challenges.length)]
            const enemyX = Math.random() * (window.innerWidth - 100) // Position X aléatoire
            const direction = Math.random() < 0.5 ? 1 : -1 // Direction initiale

            setEnemies((prevEnemies) => [
                ...prevEnemies,
                { x: enemyX, y: 0, type: randomChallenge, direction }, // Ajout de la direction
            ])
        }

        const enemyInterval = setInterval(spawnEnemy, 3000) // Générer un ennemi toutes les 3 secondes

        return () => clearInterval(enemyInterval)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Mettre à jour la position des ennemis
    useEffect(() => {
        const moveEnemies = () => {
            setEnemies((prevEnemies) => {
                return prevEnemies
                    .map((enemy) => {
                        // Détermine aléatoirement la direction

                        return {
                            ...enemy,
                            y: enemy.y + 2, // Descendre l'ennemi
                        }
                    })
                    .filter((enemy) => enemy.y < window.innerHeight) // Garder les ennemis à l'écran
            })
        }

        const enemyMovementInterval = setInterval(moveEnemies, 16)

        return () => clearInterval(enemyMovementInterval)
    }, [])

    const changeEnemyDirection = (enemy) => {
        return {
            ...enemy,
            direction: Math.random() < 0.5 ? 1 : -1, // Changer la direction aléatoirement
        }
    }
    // Gérer la direction des ennemis
    useEffect(() => {
        const changeDirectionsInterval = setInterval(() => {
            setEnemies((prevEnemies) => prevEnemies.map(changeEnemyDirection))
        }, 1000) // Change la direction toutes les 1 seconde

        return () => clearInterval(changeDirectionsInterval)
    }, [])

    return (
        <main className={`game page fade-in ${isDark ? '' : 'light'}`}>
            <div
                className="player"
                style={{
                    left: `${playerPosition.x}px`,
                    top: `${playerPosition.y}px`,
                }}
            >
                <img src={spaceshipAsset} alt="vaisseau spatial" />
            </div>

            {projectiles.map((proj, index) => (
                <Projectile key={index} x={proj.x} y={proj.y} />
            ))}
            {enemies.map((enemy, index) => (
                <Enemy key={index} x={enemy.x} y={enemy.y} type={enemy.type} />
            ))}
        </main>
    )
}

export default GamePage
