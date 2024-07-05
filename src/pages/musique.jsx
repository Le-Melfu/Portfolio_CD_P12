import React, { useContext } from 'react'
import SectionHeader from '../components/molecules/sectionHeader'
import AudioPlayer from '../components/organisms/player'
import SoundcloudBtn from '../components/atoms/soundcloudBtn'
import { ThemeContext } from '../assets/ThemeContext'

const MusicPage = () => {
    const { isDark } = useContext(ThemeContext)

    return (
        <div className={`music page ${isDark ? '' : 'light'}`}>
            <SectionHeader
                title="Musique"
                desc="Passioné de musique depuis très jeune et ayant commencé la guitare à l'âge de 11 ans, je dédie une grande partie de mon temps libre à cette activité, que ce soit dans la pratique d'instruments divers (guitare, basse, voix...), mais également dans la pratique de la MAO. J'ai plusieurs fois eu l'occasion lors de concours de court-métrages de réaliser des musiques pour certaines d'entre eux."
            />
            <AudioPlayer />
            <SoundcloudBtn />
        </div>
    )
}

export default MusicPage
