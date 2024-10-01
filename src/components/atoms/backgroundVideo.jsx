import './backgroundVideo.scss'
import imageBackground from '../../assets/videos/blue-waves.webp'
import imageBackgroundInvert from '../../assets/videos/blue-waves-negate.webp'

import video from '../../assets/videos/blue-waves.webm'
import videoInvert from '../../assets/videos/blue-waves-negate.webm'
import { useContext, useEffect, useRef } from 'react'
import { ThemeContext } from '../../assets/ThemeContext'
import { useMediaQuery } from 'react-responsive'

const BackgroundVideo = () => {
    const isMobile = useMediaQuery({ maxWidth: '969px' })
    const { isDark } = useContext(ThemeContext)
    const videoSource = isDark ? video : videoInvert
    const videoElementRef = useRef(null)

    const imageSource = isDark ? imageBackground : imageBackgroundInvert

    useEffect(() => {
        const videoElement = videoElementRef.current
        if (videoElement) {
            videoElement.muted = true
            setTimeout(() => {
                videoElement.play()
            }, 500)
        }
    }, [])

    useEffect(() => {
        const videoElement = videoElementRef.current
        if (videoElement) {
            videoElement.pause()
            videoElement.setAttribute('src', videoSource)
            videoElement.load()
            setTimeout(() => {
                videoElement.play()
            }, 500)
        }
    }, [videoSource])

    if (isMobile) {
        return (
            <div className="bg-v">
                <img src={imageSource} alt="Vague polygonales bleu" />
            </div>
        ) // Ne pas rendre la vidéo du tout si on est sur mobile
    }

    return (
        <div className="bg-v">
            <video
                id="background-video"
                ref={videoElementRef}
                muted
                loop
                playsInline
            >
                <source src={videoSource} type="video/mp4" />
            </video>
        </div>
    )
}

export default BackgroundVideo
