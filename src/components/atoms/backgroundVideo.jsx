import './backgroundVideo.scss'
import video from '../../assets/videos/blue-waves.mp4'
import { useEffect } from 'react'

const BackgroundVideo = () => {
    useEffect(() => {
        const videoElement = document.getElementById('background-video')
        if (videoElement) {
            videoElement.muted = true // S'assurer que la vidéo est muette
            videoElement.play().catch((error) => {
                console.log('Autoplay a été bloqué :', error)
            })
        }
    }, [])
    return (
        <div className="bg-v">
            <video id="background-video" muted loop playsinline>
                <source src={video} type="video/mp4" />
            </video>
        </div>
    )
}

export default BackgroundVideo
