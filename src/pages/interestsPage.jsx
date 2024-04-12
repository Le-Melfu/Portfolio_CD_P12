import PopUpCard3D from '../components/molecules/3DPopUpCard'
import SectionHeader from '../components/molecules/sectionHeader'
import './interestsPage.scss'

const InterestsPage = () => {
    return (
        <main className="interests page">
            <SectionHeader title={`centres d'intérêts`} />
            <div className="interests__cards">
                <PopUpCard3D
                    title="Musique"
                    content="Ayant commencé la guitare à l'âge de 11 ans, je m'intéresse beaucoup à ce milieu."
                    link="/music"
                />
                <PopUpCard3D
                    title="Cuisine"
                    content="J'adore cuisiner et m'intéresse beaucoup à la cuisine italienne !"
                    link=""
                />
                <PopUpCard3D
                    title="Jeux vidéos"
                    content="Je me passione pour tous types de jeux vidéos mais principalement les RPGs."
                    link=""
                />
                <PopUpCard3D
                    title="Technologies"
                    content="Robotisation des tâches ménagères, j'adorerais domotiser entièrement mon domicile !"
                    link=""
                />
                <PopUpCard3D
                    title="Figurines"
                    content="J'aime peindre et passer du temps pour affiner mes compétences et ma précision sur mes figurines."
                    link="https://www.instagram.com/melfus_paints?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                />
            </div>
        </main>
    )
}

export default InterestsPage
