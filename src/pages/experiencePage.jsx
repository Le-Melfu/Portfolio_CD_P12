import { useContext } from 'react'
import ScrolledBanner from '../components/atoms/scrolledBanner'
import SectionHeader from '../components/molecules/sectionHeader'
import { ThemeContext } from '../assets/ThemeContext'

const ExperiencePage = () => {
    const { isDark } = useContext(ThemeContext)

    return (
        <main className={`xp page ${isDark ? '' : 'light'}`}>
            <SectionHeader
                title="expériences & études"
                desc="Organisation, Adaptation, Indépendance, Anglais bilingue, Permis B"
            />
            <div className="xp__content">
                {/* Need to specify number of banners in SASS loop */}
                <ScrolledBanner bannerNum="1">
                    <h3>Formations et diplômes</h3>
                    <ul>
                        <li>Intégrateur web - OpenClassrooms</li>
                        <li>
                            Musicien Interprète des Musiques Actuelles - EF2M
                            Tourcoing
                        </li>
                        <li>
                            CESS (Bac) option Auxiliète Administratif et
                            d’Accueil - SAAVUTUS Rixensart Belgique
                        </li>
                        <li>Infographie - Don Bosco Tournai Belgique</li>
                        <li>Illustration - Saint-Luc Tournai Belgique</li>
                    </ul>
                </ScrolledBanner>
                <ScrolledBanner bannerNum="2" className="align-right">
                    <h3>Compétences</h3>
                    <ul>
                        <li>HTML/CSS</li>
                        <li>JAVASCRIPT</li>
                        <li>REACT</li>
                        <li>REDUX</li>
                        <li>
                            Musique (Guitare, chant, batterie, basse, piano,
                            MAO)
                        </li>
                    </ul>
                </ScrolledBanner>
                <ScrolledBanner bannerNum="3">
                    <h3>Expériences</h3>
                    <ul>
                        <li>
                            Guitariste/Soliste pour FIREFLIES, BRAVE THE LIGHT,
                            BEEZTOFLY
                        </li>
                        <li>Assistant d’éducation - Lycée Colbert Tourcoing</li>
                        <li>Employé polyvalent - NOZ Cournon-d’Auvergne</li>
                    </ul>
                </ScrolledBanner>
            </div>
        </main>
    )
}

export default ExperiencePage
