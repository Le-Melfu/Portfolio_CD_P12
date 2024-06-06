import './player.scss'
import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [selectedSong, setSelectedSong] = useState(null)
    const [audioSrc, setAudioSrc] = useState(null)
    const [volume, setVolume] = useState(1)
    const [volumeCollapsed, setVolumeCollapsed] = useState(true)
    const [musicData, setMusicData] = useState([])
    const [loading, setLoading] = useState()
    const [songLoading, setSongLoading] = useState()

    const URL_API = 'https://api.clementdegardenzi.fr/api'

    const isMobile = useMediaQuery({ maxWidth: 992 })

    const audioRef = useRef(null)

    const handleVolumeCollapsed = () => {
        setVolumeCollapsed(!volumeCollapsed)
    }

    const handleSeek = (e) => {
        audioRef.current.currentTime = parseFloat(e.target.value)
        setCurrentTime(e.target.value)
    }

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime)
        setDuration(audioRef.current.duration)
    }

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value
        audioRef.current.volume = newVolume
        setVolume(newVolume)
    }

    const handlePlay = () => {
        audioRef.current.play()
        setIsPlaying(true)
    }
    const handlePause = () => {
        audioRef.current.pause()
        setIsPlaying(false)
    }
    const handlePlayPause = () => {
        if (isPlaying) {
            handlePause()
        } else {
            handlePlay()
        }
    }
    const handleAudio = async (value) => {
        try {
            const response = await fetch(`${URL_API}/audio/${value.filename}`)
            const blob = await response.blob()
            const url = URL.createObjectURL(blob)
            setAudioSrc(url)
        } catch (error) {
            console.error('Error fetching audio file:', error)
        }
    }

    const handleSelection = async (value) => {
        setSongLoading(true)
        handlePause()
        setSelectedSong(value)
        setCurrentTime(0)
        await handleAudio(value)
        setSongLoading(false)
        setTimeout(() => {
            handlePlay()
        }, 300)
    }

    function formatDuration(durationSeconds) {
        const minutes = Math.floor(durationSeconds / 60)
        const seconds = Math.floor(durationSeconds % 60)
        const formattedSeconds = seconds.toString().padStart(2, '0')
        return `${minutes}:${formattedSeconds}`
    }

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration)
    }

    useEffect(() => {
        const currentAudioRef = audioRef.current
        currentAudioRef.addEventListener('timeupdate', handleTimeUpdate)
        currentAudioRef.addEventListener('loadedmetadata', handleLoadedMetadata)
        return () => {
            currentAudioRef.removeEventListener('timeupdate', handleTimeUpdate)
            currentAudioRef.removeEventListener(
                'loadedmetadata',
                handleLoadedMetadata
            )
        }
    }, [audioSrc])

    useEffect(() => {
        const fetchMusicData = async () => {
            try {
                setSongLoading(true)
                setLoading(true)
                const response = await fetch(URL_API + '/music')
                const data = await response.json()
                await setLoading(false)
                await setMusicData(data)
                setSelectedSong(data[0])
                handleAudio(data[0])
                setSongLoading(false)
            } catch (error) {
                console.error('Error fetching music data:', error)
            }
        }

        fetchMusicData()
    }, [])

    if (loading) {
        return <div className="audio-player">Chargement en cours...</div>
    } else {
        return (
            <div className="audio-player">
                <div className="audio-player__current-play">
                    <button
                        aria-label={isPlaying ? 'bouton pause' : 'bouton play'}
                        className="playbtn"
                        onClick={() => handlePlayPause()}
                    >
                        {isPlaying ? (
                            <i className="fa-solid fa-pause playbtn-i" />
                        ) : (
                            <i className="fa-solid fa-play playbtn-i" />
                        )}
                    </button>
                    <span className="audio-player__title">
                        {selectedSong?.title}
                    </span>
                    <audio ref={audioRef} src={audioSrc} preload="auto" />
                    <input
                        aria-label="barre de lecture"
                        className="audio-player__bar"
                        type="range"
                        min="0"
                        max={duration}
                        value={currentTime}
                        onChange={handleSeek}
                    />
                    <div className="audio-player__duration">
                        <p>{formatDuration(currentTime)}</p>
                        {songLoading ? (
                            '...'
                        ) : (
                            <p>{formatDuration(duration)}</p>
                        )}
                    </div>

                    {!isMobile && (
                        <div className="audio-player__volume-wrapper">
                            <input
                                aria-label="barre de volume"
                                className={
                                    volumeCollapsed
                                        ? 'audio-player__volume--collapsed'
                                        : 'audio-player__volume'
                                }
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={handleVolumeChange}
                            />

                            <button
                                onClick={() => handleVolumeCollapsed()}
                                className="volume-toggle"
                                aria-label="Bouton du slider de volume"
                            >
                                <i className="fa-solid fa-volume-high audio-player__volume--icon" />
                            </button>
                        </div>
                    )}
                </div>

                <div className="audio-player__selection">
                    {musicData.map((song) => (
                        <div
                            key={song.id}
                            className="audio-player__selection__song"
                            onClick={() => handleSelection(song)}
                        >
                            <p>{song.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default AudioPlayer
