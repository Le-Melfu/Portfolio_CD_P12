import React, { useEffect, useState, useContext } from 'react'
import './gamePage.scss'
import { ThemeContext } from '../assets/ThemeContext'
import spaceshipAsset from '../assets/images/gamePageAssets/playerShip.png'
import Projectile from '../components/atoms/gameProjectile'
import Enemy from '../components/atoms/gameEnnemy'
import shootMP3 from '../assets/music/shoot.mp3'
import hitMP3 from '../assets/music/hit.mp3'
import gameMusicMP3 from '../assets/music/portfoliogamu.mp3'
import bottomHitMP3 from '../assets/music/bottomHit.mp3'
import health1 from '../assets/images/gamePageAssets/health1.png'
import health2 from '../assets/images/gamePageAssets/health2.png'
import health3 from '../assets/images/gamePageAssets/health3.png'
import health4 from '../assets/images/gamePageAssets/health4.png'
import controlsArrow from '../assets/images/gamePageAssets/controlsArrow.png'
import controlsSpaceBar from '../assets/images/gamePageAssets/controlsSpaceBar.png'

const GamePage = () => {
    const { isDark } = useContext(ThemeContext)
    const [hitSound, setHitSound] = useState(null)
    const [gameMusic, setGameMusic] = useState(null)
    const [bottomHitSound, setBottomHitSound] = useState(null)
    const [inputs, setInputs] = useState({
        left: false,
        right: false,
        up: false,
        down: false,
    })
    const gameWidth = window.innerWidth < 1440 ? window.innerWidth * 0.8 : 1440
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
        setHealthPoints(4)
        setCurrentHealthAsset(getHealthAsset(4))
    }
    // État pour les points de vie
    const [healthPoints, setHealthPoints] = useState(4)
    const healthAssets = [
        health1, // 1 HP
        health2, // 2 HP
        health3, // 3 HP
        health4, // 4 HP (max)
    ]
    const [currentHealthAsset, setCurrentHealthAsset] = useState(health4)

    // Fonction pour obtenir l'image en fonction des points de vie
    const getHealthAsset = (healthPoints) => {
        if (healthPoints <= 1) return healthAssets[0]
        if (healthPoints <= 2) return healthAssets[1]
        if (healthPoints <= 3) return healthAssets[2]
        return healthAssets[3]
    }

    useEffect(() => {
        const newHealthAsset = getHealthAsset(healthPoints)
        setCurrentHealthAsset(newHealthAsset)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [healthPoints, isGameRunning])

    const [playerPosition, setPlayerPosition] = useState({
        x: gameWidth / 2 - 25,
        y: gameWidth / 2 - 25,
    })

    const speed = 10
    const [projectiles, setProjectiles] = useState([])
    const [canShoot, setCanShoot] = useState(true) // État pour contrôler le tir
    const challenges = [
        'HTML',
        'CSS',
        'JavaScript',
        'React',
        'SASS',
        'Responsive Design',
        'Accessibilité',
        'Performances',
        'Optimisation',
        'Gestion des images',
        'Compatibilité entre navigateurs',
        'Gestion de version',
        'Débogage',
        'Résolution de problèmes',
        'Intégration API',
        'Gestion des états',
        "Travail d'équipe",
        'Sécurité',
        'Déploiement',
        'Veille technologique',
        'Communication',
        'Méthodes agiles',
    ]
    const [enemies, setEnemies] = useState([])
    const [destroyingEnemies, setDestroyingEnemies] = useState([])
    const [enemyProjectiles, setEnemyProjectiles] = useState([])

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
        const bottomHitSound = new Audio(bottomHitMP3)

        setHitSound(sound2)
        setBottomHitSound(bottomHitSound)

        return () => {
            // Optionnel : Libération des ressources audio si nécessaire
            music.pause()
            music.currentTime = 0
            sound2.pause()
            bottomHitSound.pause()
        }
    }, [])

    useEffect(() => {
        if (gameMusic) {
            if (isGameRunning) {
                gameMusic.play()
            } else {
                gameMusic.pause()
                gameMusic.currentTime = 0 // Réinitialiser au début
            }
        }
    }, [isGameRunning, gameMusic])

    useEffect(() => {
        const handleEnterDown = (event) => {
            if (!isGameRunning && event.code === 'Enter') {
                startGame()
            }
        }

        // Ajouter l'écouteur d'événements
        window.addEventListener('keydown', handleEnterDown)

        // Nettoyer l'écouteur d'événements lors du démontage du composant
        return () => {
            window.removeEventListener('keydown', handleEnterDown)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGameRunning])

    // Gérer l'entrée de tir séparément
    useEffect(() => {
        const handleSpaceDown = (event) => {
            if (isGameRunning && event.code === 'Space' && canShoot) {
                const laserSound = new Audio(shootMP3)
                laserSound.play()
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

        window.addEventListener('keydown', handleSpaceDown)

        return () => {
            window.removeEventListener('keydown', handleSpaceDown)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGameRunning, canShoot, playerPosition.x, playerPosition.y])

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

        const interval = setInterval(movePlayer, 18) // approx. 60 FPS

        return () => clearInterval(interval)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputs])

    const destructionTimer = 500
    const handleEnemyDestruction = async (enemyId) => {
        // You may want to add a delay before proceeding to remove the enemy from the state
        setScore((prevScore) => prevScore + 1)
        setTimeout(() => {
            setEnemies((prev) => prev.filter((enemy) => enemy.id !== enemyId))
        }, destructionTimer)
        setTimeout(() => {
            setDestroyingEnemies((prev) => prev.filter((id) => id !== enemyId)) // Remove from destroyingEnemies
        }, destructionTimer)
    }

    // Mettre à jour les projectiles
    useEffect(() => {
        const checkCollision = (proj, enemy) => {
            const enemyWidth = 70 // Set to your enemy width
            const enemyHeight = 70 // Set to your enemy height
            const isCollision =
                proj.x < enemy.x + enemyWidth &&
                proj.x + 4 > enemy.x &&
                proj.y < enemy.y + enemyHeight &&
                proj.y + 4 > enemy.y
            if (isCollision) {
                hitSound.currentTime = 0
                hitSound.play()
                return true
            }
            return false
        }

        const update = async () => {
            setProjectiles((prevProjectiles) => {
                const updatedProjectiles = prevProjectiles
                    .map((proj) => ({ ...proj, y: proj.y - proj.speed }))
                    .filter((proj) => proj.y > 0) // Keep projectiles on screen

                // Collision check
                setEnemies((prevEnemies) => {
                    const enemiesToDestroy = []

                    const remainingEnemies = prevEnemies.map((enemy) => {
                        const hit = updatedProjectiles.some((proj, id) => {
                            if (checkCollision(proj, enemy)) {
                                updatedProjectiles.splice(id, 1) // Marque le projectile pour suppression
                                return true
                            }
                            return false
                        })

                        if (hit && !enemy.shield) {
                            enemiesToDestroy.push(enemy.id)
                            return enemy
                        }

                        if (hit && enemy.shield) {
                            setEnemies((prevEnemies) =>
                                prevEnemies.map((e) => {
                                    if (e.id === enemy.id) {
                                        // État avant mise à jour
                                        const updatedEnemy = {
                                            ...e,
                                            shield: false,
                                            health: 1,
                                        }
                                        return updatedEnemy // Désactiver le bouclier
                                    }
                                    return e
                                })
                            )
                        }

                        return enemy // Garde l'ennemi s'il n'est pas touché
                    }) // Filtre les ennemis détruits // Filter out destroyed enemies (null)

                    // Handle enemy destruction
                    enemiesToDestroy.forEach((enemyId) => {
                        if (!destroyingEnemies.includes(enemyId)) {
                            setDestroyingEnemies((prev) => [...prev, enemyId])
                            handleEnemyDestruction(enemyId)
                        }
                    })

                    return remainingEnemies
                })

                // Remove projectiles that hit an enemy
                return updatedProjectiles
            })
        }

        const animationFrameId = requestAnimationFrame(update)

        return () => cancelAnimationFrame(animationFrameId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectiles, isGameRunning, destroyingEnemies])

    // Gérer les ennemis
    useEffect(() => {
        const spawnEnemy = () => {
            const randomChallenge =
                challenges[Math.floor(Math.random() * challenges.length)]
            const enemyX = Math.random() * (gameWidth - 50) // Position X aléatoire
            const enemySpeed = Math.random() * 2 + 1 // Vitesse de l'ennemi
            const enemyId = Date.now()
            const shield = Math.random() < 0.3
            const enemyHealth = shield ? 2 : 1

            const newEnemy = {
                id: 'ennemy-' + enemyId,
                x: enemyX,
                y: 0,
                type: randomChallenge,
                shield: shield,
                health: enemyHealth,
                speed: enemySpeed,
            }

            setEnemies((prevEnemies) => [...prevEnemies, newEnemy])

            setTimeout(() => {
                spawnEnemyProjectile(enemyX, 0) // Vous pouvez ajuster la position Y selon le niveau de l'ennemi
            }, 100) // Délai avant que l'ennemi tire (par exemple, 2 secondes)

            // Appelle à nouveau spawnEnemy avec un délai aléatoire
            const randomDelay = Math.random() * (3000 - 1000) + 1000 // Délai entre 1 et 3 secondes
            enemyInterval = setTimeout(spawnEnemy, randomDelay)
        }

        let enemyInterval // Variable pour stocker le timeout

        if (isGameRunning) {
            spawnEnemy() // Appelle la fonction une première fois pour démarrer le processus

            return () => clearTimeout(enemyInterval) // Nettoie le timeout
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGameRunning])

    const spawnEnemyProjectile = (enemyX, enemyY) => {
        setEnemyProjectiles((prev) => [
            ...prev,
            {
                id: 'enemy-proj-' + Date.now(),
                x: enemyX + 30, // Centrer le projectile
                y: enemyY + 60, // Position initiale en dessous de l'ennemi
                speed: 5,
            },
        ])
    }

    useEffect(() => {
        const updateEnemyProjectiles = () => {
            setEnemyProjectiles((prevProjectiles) => {
                return prevProjectiles
                    .map((proj) => ({ ...proj, y: proj.y + proj.speed })) // Descendre le projectile
                    .filter((proj) => proj.y < gameHeight) // Garder les projectiles à l'écran
            })
        }

        const enemyProjectileInterval = setInterval(updateEnemyProjectiles, 16) // approx. 60 FPS
        return () => clearInterval(enemyProjectileInterval)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGameRunning])

    const [playerHitAnim, setPlayerHitAnim] = useState(false)
    // Collision entre les projectiles ennemis et le joueur
    useEffect(() => {
        const checkEnemyProjectileCollision = () => {
            enemyProjectiles.forEach((proj) => {
                const isCollision =
                    proj.x < playerPosition.x + 50 && // Largeur du joueur
                    proj.x + 4 > playerPosition.x &&
                    proj.y < playerPosition.y + 50 && // Hauteur du joueur
                    proj.y + 4 > playerPosition.y

                if (isCollision) {
                    setPlayerHitAnim(true)
                    setTimeout(() => {
                        setPlayerHitAnim(false)
                    }, 200)
                    hitSound.currentTime = 0
                    hitSound.play()
                    // Gérer les points de vie ici
                    setHealthPoints((prevHealth) => {
                        const newHealth = prevHealth - 1
                        if (newHealth <= 0) {
                            setPlayerLost(true)
                            setIsGameRunning(false)
                        }

                        return newHealth
                    })

                    setEnemyProjectiles((prev) =>
                        prev.filter((p) => p.id !== proj.id)
                    ) // Supprimer le projectile
                }
            })
        }

        const collisionInterval = setInterval(checkEnemyProjectileCollision, 1)
        return () => clearInterval(collisionInterval)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enemyProjectiles, playerPosition, isGameRunning])

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
                            setPlayerHitAnim(true)
                            bottomHitSound.currentTime = 0
                            bottomHitSound.play()
                            // Si l'ennemi touche le bas de l'écran, diminuer les points de vie
                            setHealthPoints((prevHealth) => {
                                const newHealth = prevHealth - 1
                                if (newHealth <= 0) {
                                    // Logique si les points de vie atteignent zéro (fin du jeu par exemple)
                                    setPlayerLost(true)
                                    setIsGameRunning(false)
                                    return 0
                                }
                                return newHealth
                            })
                            setTimeout(() => {
                                setPlayerHitAnim(false)
                            }, 200)
                            return false // Retirer l'ennemi
                        }
                        return true // Garder l'ennemi
                    })
                    return updatedEnemies
                })
            }
        }, 16)
        return () => clearInterval(enemyMovementInterval)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGameRunning])

    return (
        <main
            id="gamePage"
            className={`game page fade-in ${isDark ? '' : 'light'}`}
            style={{ zIndex: isGameRunning ? 1 : -1 }}
        >
            {!isGameRunning &&
                !playerLost && ( // Écran de démarrage
                    <div className="start-screen">
                        <button onClick={startGame}>
                            Appuyez sur Entrée pour jouer
                        </button>
                        <div className="controls">
                            <div className="controls__scheme">
                                <div>
                                    <h3>Commande de Tir</h3>
                                    <img
                                        className="controlsSpaceBar"
                                        src={controlsSpaceBar}
                                        alt="Barre espace"
                                    />
                                </div>
                                <div>
                                    <h3>Déplacements</h3>
                                    <img
                                        className="controlsArrow"
                                        src={controlsArrow}
                                        alt="Flèches directionelles"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            {playerLost && ( // Écran de Game Over
                <div className="game-over-screen">
                    <h2>Game Over</h2>
                    <p className="game-over-score">Score: {score}</p>
                    <p className="game-over-catch">
                        Si seulement vous aviez un junior pour vous assister...
                    </p>
                    <p className="game-over-catch">
                        <a href="mailto:degardenzi.clement@gmail.com">
                            degardenzi.clement@gmail.com
                        </a>
                    </p>

                    <button onClick={startGame}>
                        Appuyez sur Entrée pour rejouer
                    </button>
                </div>
            )}
            {isGameRunning &&
                !playerLost && ( // Zone de jeu active
                    <>
                        <div
                            className={`game-interface-hitscreen ${
                                playerHitAnim
                                    ? 'game-interface-hitscreen--hit'
                                    : ''
                            }`}
                        />
                        <div
                            className={`player ${
                                playerHitAnim ? 'player--hit' : ''
                            }`}
                            style={{
                                left: `${playerPosition.x}px`,
                                top: `${playerPosition.y}px`,
                            }}
                        >
                            <img
                                className="player-ship"
                                src={spaceshipAsset}
                                alt="vaisseau spatial"
                            />
                            <img
                                src={currentHealthAsset}
                                alt={`health-${healthPoints}`}
                                className="game-interface-health"
                            />
                        </div>
                        <>
                            {projectiles.map((proj) => (
                                <Projectile
                                    key={proj.id}
                                    x={proj.x}
                                    y={proj.y}
                                    type="player"
                                />
                            ))}
                        </>
                        <>
                            {enemyProjectiles.map((proj) => (
                                <Projectile
                                    key={proj.id}
                                    x={proj.x}
                                    y={proj.y}
                                    type="enemy"
                                />
                            ))}
                        </>
                        <>
                            {enemies.map((enemy) => (
                                <Enemy
                                    key={`key-${enemy.id}`}
                                    id={enemy.id}
                                    x={enemy.x}
                                    y={enemy.y}
                                    type={enemy.type}
                                    isDestroyed={destroyingEnemies.includes(
                                        enemy.id
                                    )}
                                    destructionTimer={destructionTimer}
                                    shield={enemy.shield}
                                />
                            ))}
                        </>
                        <div className="game-interface">
                            <p className="game-interface-score">
                                Score: {score}
                            </p>
                            <img
                                src={currentHealthAsset}
                                alt={`health-${healthPoints}`}
                                className={`game-interface-health--static ${
                                    playerHitAnim ? 'player--hit' : ''
                                }`}
                            />
                        </div>
                    </>
                )}
        </main>
    )
}

export default GamePage
