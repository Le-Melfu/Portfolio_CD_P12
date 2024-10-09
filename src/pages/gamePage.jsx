import React, { useEffect, useState, useContext } from 'react'
import './gamePage.scss'
import { ThemeContext } from '../assets/ThemeContext'
import spaceshipAsset from '../assets/images/gamePageAssets/playerShip.png'
import Projectile from '../components/atoms/gameProjectile'
import Enemy from '../components/atoms/gameEnnemy'
import shootMP3 from '../assets/music/shoot.mp3'
import hitMP3 from '../assets/music/hit.mp3'
import gameMusicMP3 from '../assets/music/portfoliogamu.mp3'

const GamePage = () => {
    const { isDark } = useContext(ThemeContext)
    const [hitSound, setHitSound] = useState(null)
    const [gameMusic, setGameMusic] = useState(null)
    const [inputs, setInputs] = useState({
        left: false,
        right: false,
        up: false,
        down: false,
    })
    const gameWidth = window.innerWidth < 1440 ? window.innerWidth : 1440
    const gameHeight = window.innerHeight

    const [isGameRunning, setIsGameRunning] = useState(false)
    const [score, setScore] = useState(0)
    const [playerLost, setPlayerLost] = useState(false)
    const startGame = () => {
        setPlayerLost(false)
        setScore(0)
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
    const [destroyingEnemies, setDestroyingEnemies] = useState([])

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
        const music = new Audio(gameMusicMP3)
        music.loop = true // La musique se répète en boucle
        music.preload = 'auto'
        music.volume = 0.7

        setGameMusic(music)

        const sound2 = new Audio(hitMP3)

        setHitSound(sound2)

        return () => {
            // Optionnel : Libération des ressources audio si nécessaire
            music.pause()
            music.currentTime = 0
            sound2.pause()
        }
    }, [])

    useEffect(() => {
        if (gameMusic) {
            if (isGameRunning) {
                gameMusic
                    .play()
                    .catch((error) =>
                        console.error('Erreur de lecture de la musique:', error)
                    )
            } else {
                gameMusic.pause()
                gameMusic.currentTime = 0 // Réinitialiser au début
            }
        }
    }, [isGameRunning, gameMusic])

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
                        id: 'proj-' + Date.now(),
                        x: playerPosition.x + 25,
                        y: playerPosition.y,
                        speed: 10,
                    },
                ])
                setTimeout(() => setCanShoot(true), 50)
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputs])

    const checkCollision = (proj, enemy) => {
        const enemyWidth = 50 // Set to your enemy width
        const enemyHeight = 50 // Set to your enemy height
        const isCollision =
            proj.x < enemy.x + enemyWidth &&
            proj.x + 4 > enemy.x &&
            proj.y < enemy.y + enemyHeight &&
            proj.y + 4 > enemy.y
        if (isCollision) {
            hitSound.currentTime = 0
            hitSound
                .play()
                .catch((error) =>
                    console.error('Erreur de lecture du son:', error)
                )

            // Start the destruction animation
            setDestroyingEnemies((prev) => [...prev, enemy.id])

            // Handle enemy destruction after a delay
            setTimeout(() => {
                handleEnemyDestruction(enemy.id)
            }, 1500)

            return true
        }
        return false
    }

    const handleEnemyDestruction = async (enemyId) => {
        // You may want to add a delay before proceeding to remove the enemy from the state
        setTimeout(() => {
            setDestroyingEnemies((prev) => prev.filter((id) => id !== enemyId)) // Remove from destroyingEnemies
            setEnemies((prev) => prev.filter((enemy) => enemy.id !== enemyId))
        }, 1000)
    }

    // Mettre à jour les projectiles
    useEffect(() => {
        const projectilesToRemove = []
        const update = async () => {
            setProjectiles((prevProjectiles) => {
                const updatedProjectiles = prevProjectiles
                    .map((proj) => ({ ...proj, y: proj.y - proj.speed }))
                    .filter((proj) => proj.y > 0) // Keep projectiles on screen

                // Collision check
                setEnemies((prevEnemies) => {
                    const enemiesToDestroy = []

                    const remainingEnemies = prevEnemies
                        .map((enemy) => {
                            const hit = updatedProjectiles.some((proj) => {
                                if (checkCollision(proj, enemy)) {
                                    projectilesToRemove.push(proj.id) // Marque le projectile pour suppression
                                    return true
                                }
                                return false
                            })

                            if (hit && !enemy.shield) {
                                enemiesToDestroy.push(enemy.id) // Marque l'ennemi pour destruction
                                return enemiesToDestroy // Renvoie null pour que ce soit filtré plus tard
                            }

                            if (hit && enemy.shield) {
                                console.log(
                                    `Enemy shield hit: ${enemy.id}, shield will deactivate.`
                                )
                                setTimeout(() => {
                                    setEnemies((prevEnemies) =>
                                        prevEnemies.map((e) =>
                                            e.id === enemy.id
                                                ? { ...e, shield: false }
                                                : e
                                        )
                                    )
                                }, 500) // 500 ms d'invulnérabilité

                                return {
                                    ...enemy,
                                    health: 1, // Fixe la santé après désactivation du bouclier
                                }
                            }

                            return enemy // Garde l'ennemi s'il n'est pas touché
                        })
                        .filter(Boolean) // Filtre les ennemis détruits // Filter out destroyed enemies (null)

                    // Handle enemy destruction
                    enemiesToDestroy.forEach((enemyId) => {
                        if (!destroyingEnemies.includes(enemyId)) {
                            setScore((prevScore) => prevScore + 1)
                            setDestroyingEnemies((prev) => [...prev, enemyId])

                            setTimeout(() => {
                                handleEnemyDestruction(enemyId)
                            }, 500)
                        }
                    })

                    return remainingEnemies
                })

                // Remove projectiles that hit an enemy
                return updatedProjectiles.filter(
                    (proj) => !projectilesToRemove.includes(proj.id)
                )
            })
        }

        const animationFrameId = requestAnimationFrame(update)

        return () => cancelAnimationFrame(animationFrameId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectiles, isGameRunning])

    // Gérer les ennemis
    useEffect(() => {
        const spawnEnemy = () => {
            const randomChallenge =
                challenges[Math.floor(Math.random() * challenges.length)]
            const enemyX = Math.random() * (gameWidth - 50) // Position X aléatoire
            const enemySpeed = Math.random() * 2 + 1
            const enemyId = Date.now()
            const shield = Math.random() < 0.5
            const enemyHealth = shield ? 2 : 1

            const newEnemy = {
                id: enemyId,
                x: enemyX,
                y: 0,
                type: randomChallenge,
                shield: shield,
                health: enemyHealth,
                speed: enemySpeed,
            }

            setEnemies((prevEnemies) => [...prevEnemies, newEnemy])
        }
        if (isGameRunning) {
            const enemyInterval = setInterval(spawnEnemy, 2000) // Spawn every 2 seconds

            return () => clearInterval(enemyInterval)
        }

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
                    <p>Score: {score}</p>
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
                        <>
                            {projectiles.map((proj, index) => (
                                <Projectile key={index} x={proj.x} y={proj.y} />
                            ))}
                            {enemies.map((enemy, index) => (
                                <Enemy
                                    key={enemy.id}
                                    id={enemy.id}
                                    x={enemy.x}
                                    y={enemy.y}
                                    type={enemy.type}
                                    isDestroyed={destroyingEnemies.includes(
                                        enemy.id
                                    )}
                                    shield={enemy.shield}
                                />
                            ))}
                        </>
                        <div className="health">
                            <p>Health Points: {healthPoints}</p>
                            <p>Score: {score}</p>
                        </div>
                    </>
                )}
        </main>
    )
}

export default GamePage
