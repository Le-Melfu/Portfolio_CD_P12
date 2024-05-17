import './player.scss'
import { musicData } from '../../assets/datas.js'
import { useEffect, useRef, useState } from 'react'

const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [selectedSong, setSelectedSong] = useState(null)

    const audioRef = useRef(null)

    const handleSeek = (e) => {
        audioRef.current.currentTime = e.target.value
        setCurrentTime(e.target.value)
    }

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime)
        setDuration(audioRef.current.duration)
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
                <button onClick={() => handlePlayPause()}>
                    {isPlaying ? (
                        <i class="fa-solid fa-pause" />
                    ) : (
                        <i class="fa-solid fa-play" />
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
            </div>

            <div className="audio-player__selection">
                {musicData.map((song) => (
                    <div
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
