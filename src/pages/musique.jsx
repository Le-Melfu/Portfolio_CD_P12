import React from 'react'
import SectionHeader from '../components/molecules/sectionHeader'
import MusicList from '../components/molecules/musicList'

const MusicPage = () => {
    return (
        <div className="music page">
            <SectionHeader
                title="Musique"
                desc="Passioné de musique depuis très jeune et ayant commencé la guitare à l'âge de 11 ans, je dédie une grande partie de mon temps libre à cette activité, que ce soit dans la pratique d'instruments divers (guitare, basse, voix...), mais également dans la pratique de la MAO. J'ai plusieurs fois eu l'occasion lors de concours de court-métrages de réaliser des musiques pour certaines d'entre eux."
            />
            <MusicList />
        </div>
    )
}

export default MusicPage
