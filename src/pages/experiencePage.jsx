import { useContext } from 'react'
import ScrolledBanner from '../components/atoms/scrolledBanner'
import SectionHeader from '../components/molecules/sectionHeader'
import { ThemeContext } from '../assets/ThemeContext'
import './experiencePage.scss'

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
                        <h4 className="skill-list-title">Hard Skills</h4>
                        <li>HTML, CSS, JAVASCRIPT</li>
                        <li>REACT, REDUX</li>
                        <li>SCSS, Animations CSS</li>
                        <li>Rédaction de tests unitaires</li>
                        <li>Rédaction de spécifications techniques</li>
                        <li>
                            Musique (Guitare, chant, batterie, basse, piano,MAO)
                        </li>
                        <li>Gestion de projet agile</li>
                    </ul>
                    <ul>
                        <h4 className="skill-list-title">Soft Skills</h4>
                        <li>Autonomie</li>
                        <li>Travail d'équipe</li>
                        <li>Communication</li>
                        <li>Sens de l'organisation</li>
                        <li>Prise d'initiative</li>
                        <li>Soif d'apprendre</li>
                        <li>Pensée en arborescence (Mind Mapping)</li>
                    </ul>
                </ScrolledBanner>
                <ScrolledBanner bannerNum="3">
                    <h3>Expériences</h3>
                    <ul>
                        <li>Mes Projets de formation, 2023-2024</li>
                        <li>
                            Musicien Professionel (Plusieurs formations dans le
                            Nord), 2010-2023
                        </li>
                        <li>
                            Cuisinier Préparateur, OhCanada Foodtruck, 2020-2021
                        </li>
                        <li>
                            Assistant d’éducation - Lycée Colbert, Tourcoing,
                            2017-2019
                        </li>
                        <li>
                            Employé polyvalent - NOZ, Cournon-d’Auvergne, 2015
                        </li>

                        <li>
                            Serveur - Le Bistrot du Coin, Tournai, 2010-2012
                        </li>
                    </ul>
                </ScrolledBanner>
            </div>
        </main>
    )
}

export default ExperiencePage
