import './player.scss'
import { musicData } from '../../assets/datas.js'
import { useEffect, useRef, useState } from 'react'

const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [selectedSong, setSelectedSong] = useState(null)
    const [volume, setVolume] = useState(1)
    const [volumeCollapsed, setVolumeCollapsed] = useState(true)

    const audioRef = useRef(null)

    const handleVolumeCollapsed = () => {
        setVolumeCollapsed(!volumeCollapsed)
    }

    const handleSeek = (e) => {
        audioRef.current.currentTime = e.target.value
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

    const handleSelection = (value) => {
        handlePause()
        setSelectedSong(value)
        setCurrentTime(0)
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

    useEffect(() => {
        const currentAudioRef = audioRef.current
        currentAudioRef.addEventListener('timeupdate', handleTimeUpdate)
        currentAudioRef.addEventListener('loadedmetadata', () => {
            setDuration(audioRef.current.duration)
        })
        return () => {
            currentAudioRef.removeEventListener('timeupdate', handleTimeUpdate)
            currentAudioRef.removeEventListener('loadedmetadata', () => {
                setDuration(currentAudioRef.duration)
            })
        }
    }, [selectedSong])

    return (
        <div className="audio-player">
            <div className="audio-player__current-play">
                <button className="playbtn" onClick={() => handlePlayPause()}>
                    {isPlaying ? (
                        <i className="fa-solid fa-pause playbtn-i" />
                    ) : (
                        <i className="fa-solid fa-play playbtn-i" />
                    )}
                </button>
                <span className="audio-player__title">
                    {selectedSong ? selectedSong.title : musicData[0].title}
                </span>
                <audio
                    ref={audioRef}
                    src={
                        selectedSong
                            ? selectedSong.audioSrc
                            : musicData[0].audioSrc
                    }
                />
                <input
                    className="audio-player__bar"
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={handleSeek}
                />
                <div className="audio-player__duration">
                    <p>{formatDuration(currentTime)}</p>
                    <p>{formatDuration(duration)}</p>
                </div>

                <div className="audio-player__volume-wrapper">
                    <input
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
                    >
                        <i className="fa-solid fa-volume-high audio-player__volume--icon" />
                    </button>
                </div>
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

export default AudioPlayer
