import React, { useEffect, useState, useContext } from 'react'
import './gamePage.scss'
import { ThemeContext } from '../assets/ThemeContext'
import spaceshipAsset from '../assets/images/gamePageAssets/vecteezy_spaceship-3d-rendering-icon-illustration_28567053.png'
import Projectile from '../components/atoms/gameProjectile'
import Enemy from '../components/atoms/gameEnnemy'
import shootMP3 from '../assets/music/shoot.mp3'
import hitMP3 from '../assets/music/hit.mp3'

const GamePage = () => {
    const { isDark } = useContext(ThemeContext)
    const [hitSound, setHitSound] = useState(null)

    const [inputs, setInputs] = useState({
        left: false,
        right: false,
        up: false,
        down: false,
    })
    const gameWidth = 1440
    const gameHeight = window.innerHeight

    const [isGameRunning, setIsGameRunning] = useState(false)
    const [playerLost, setPlayerLost] = useState(false)
    const startGame = () => {
        setPlayerLost(false)
        setIsGameRunning(true)
        setEnemies([]) // Réinitialiser les ennemis
        setProjectiles([]) // Réinitialiser les projectiles
        setPlayerPosition({
            x: gameWidth / 2 - 25,
            y: gameHeight / 2 + 150,
        })
        setHealthPoints(3)
    }
    // État pour les points de vie
    const [healthPoints, setHealthPoints] = useState(3)

    const [playerPosition, setPlayerPosition] = useState({
        x: gameWidth / 2 - 25,
        y: gameWidth / 2 - 25,
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
        const isCollision =
            proj.x < enemy.x + 50 &&
            proj.x + 4 > enemy.x &&
            proj.y < enemy.y + 50 &&
            proj.y + 4 > enemy.y
        if (isCollision) {
            hitSound.currentTime = 0 // Réinitialise le son pour le rejouer
            hitSound
                .play()
                .catch((error) =>
                    console.error('Erreur de lecture du son:', error)
                )
        }
        return isCollision
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

        if (isGameRunning) {
            window.addEventListener('keydown', handleKeyDown)
            window.addEventListener('keyup', handleKeyUp)
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [isGameRunning])

    useEffect(() => {
        const sound2 = new Audio(hitMP3)

        setHitSound(sound2)

        return () => {
            // Optionnel : Libération des ressources audio si nécessaire

            sound2.pause()
        }
    }, [])
    // Gérer l'entrée de tir séparément
    useEffect(() => {
        const handleSpaceDown = (event) => {
            if (event.code === 'Space' && canShoot) {
                const laserSound = new Audio(shootMP3)
                laserSound
                    .play()
                    .catch((error) =>
                        console.error('Erreur de lecture du son:', error)
                    )
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
        if (isGameRunning) {
            window.addEventListener('keydown', handleSpaceDown)
        }
        return () => {
            window.removeEventListener('keydown', handleSpaceDown)
        }
    }, [canShoot, playerPosition.x, playerPosition.y, isGameRunning])

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

                // Limiter la position X
                newX = Math.max(0, Math.min(newX, gameWidth - 50)) // 50 pour la largeur du joueur
                // Limiter la position Y
                newY = Math.max(0, Math.min(newY, gameHeight - 50)) // 50 pour la hauteur du joueur

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
    }, [projectiles, isGameRunning])

    // Gérer les ennemis
    useEffect(() => {
        const spawnEnemy = () => {
            const randomChallenge =
                challenges[Math.floor(Math.random() * challenges.length)]
            const enemyX = Math.random() * (gameWidth - 50) // Position X aléatoire
            const enemySpeed = Math.random() * 2 + 1

            setEnemies((prevEnemies) => [
                ...prevEnemies,
                {
                    x: enemyX,
                    y: 0,
                    type: randomChallenge,
                    speed: enemySpeed,
                }, // Ajout de la direction
            ])
        }

        const enemyInterval = setInterval(() => {
            if (isGameRunning) {
                spawnEnemy()
            }
        }, 2000) // Générer un ennemi toutes les 3 secondes // Générer un ennemi toutes les 3 secondes

        return () => clearInterval(enemyInterval)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGameRunning])

    // Mettre à jour la position des ennemis
    useEffect(() => {
        const moveEnemies = () => {
            setEnemies((prevEnemies) => {
                return prevEnemies
                    .map((enemy) => {
                        // Détermine aléatoirement la direction

                        return {
                            ...enemy,
                            y: enemy.y + enemy.speed, // Descendre l'ennemi
                        }
                    })
                    .filter((enemy) => enemy.y < window.innerHeight) // Garder les ennemis à l'écran
            })
        }

        const enemyMovementInterval = setInterval(() => {
            if (isGameRunning) {
                moveEnemies()

                // Vérifier si un ennemi touche le bas de l'écran
                setEnemies((prevEnemies) => {
                    const updatedEnemies = prevEnemies.filter((enemy) => {
                        if (enemy.y >= window.innerHeight - 50) {
                            // Si l'ennemi touche le bas de l'écran, diminuer les points de vie
                            setHealthPoints((prevHealth) => {
                                const newHealth = prevHealth - 1
                                if (newHealth <= 0) {
                                    // Logique si les points de vie atteignent zéro (fin du jeu par exemple)
                                    setPlayerLost(true) // Alerte pour le Game Over
                                    setIsGameRunning(false) // Arrête le jeu
                                    return 0 // Pour éviter d'avoir des points de vie négatifs
                                }

                                return newHealth
                            })

                            return false // Retirer l'ennemi
                        }
                        return true // Garder l'ennemi
                    })
                    return updatedEnemies
                })
            }
        }, 16)
        return () => clearInterval(enemyMovementInterval)
    }, [isGameRunning])

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
            {!isGameRunning &&
                !playerLost && ( // Écran de démarrage
                    <div className="start-screen">
                        <button onClick={startGame}>Start</button>
                    </div>
                )}
            {playerLost && ( // Écran de Game Over
                <div className="game-over-screen">
                    <h2>Game Over</h2>
                    <h3>Points de vie restants: {healthPoints}</h3>
                    <button onClick={startGame}>Rejouer</button>
                </div>
            )}
            {isGameRunning &&
                !playerLost && ( // Zone de jeu active
                    <>
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
                            <Enemy
                                key={index}
                                x={enemy.x}
                                y={enemy.y}
                                type={enemy.type}
                            />
                        ))}
                        <div className="health">
                            <h2>Health Points: {healthPoints}</h2>
                        </div>
                    </>
                )}
        </main>
    )
}

export default GamePage
