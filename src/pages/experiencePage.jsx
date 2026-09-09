import { useContext } from 'react'
import ScrolledBanner from '../components/atoms/scrolledBanner'
import SectionHeader from '../components/molecules/sectionHeader'
import { ThemeContext } from '../assets/ThemeContext'
import './experiencePage.scss'

const ExperiencePage = () => {
    const { isDark } = useContext(ThemeContext)

    return (
        <main className={`xp page fade-in ${isDark ? '' : 'light'}`}>
            <SectionHeader
                title="expériences & études"
                desc="Organisation, Adaptation, Autonomie, Anglais professionnel, Permis B"
            />
            <div className="xp__content">
                {/* Need to specify number of banners in SASS loop */}
                <ScrolledBanner bannerNum="1">
                    <h3>Formations et diplômes</h3>
                    <ul>
                        <li>
                            RNCP niveau 6 — Cursus Java / conception logicielle
                            (Alternance), 2024–2026
                        </li>
                        <li>Intégrateur Web — RNCP 5, OpenClassrooms, 2024</li>
                        <li>
                            Musicien Interprète — RNCP 5, EF2M Tourcoing,
                            2016–2017
                        </li>
                    </ul>
                </ScrolledBanner>
                <ScrolledBanner bannerNum="2" className="align-right">
                    <h3>Frontend & UI</h3>
                    <ul>
                        <li>Flutter / Dart</li>
                        <li>React / Redux</li>
                        <li>Architecture de composants</li>
                        <li>UI responsive, performance & accessibilité</li>
                    </ul>
                </ScrolledBanner>
                <ScrolledBanner bannerNum="3">
                    <h3>Backend & Data</h3>
                    <ul>
                        <li>TypeScript / Node.js</li>
                        <li>Java / Spring Boot</li>
                        <li>Firebase / Firestore / Cloud Functions</li>
                        <li>GCP / REST APIs</li>
                    </ul>
                </ScrolledBanner>
                <ScrolledBanner bannerNum="4" className="align-right">
                    <h3>Software Engineering</h3>
                    <ul>
                        <li>System Design & Data Modeling</li>
                        <li>Refactoring</li>
                        <li>Testing & Observability</li>
                        <li>Git</li>
                        <li>Agents IA & workflows automatisés</li>
                    </ul>
                </ScrolledBanner>
                <ScrolledBanner bannerNum="5">
                    <h3>Soft Skills</h3>
                    <ul>
                        <li>Autonomie</li>
                        <li>Travail d'équipe</li>
                        <li>Communication</li>
                        <li>Sens de l'organisation</li>
                        <li>Prise d'initiative</li>
                        <li>Soif d'apprendre</li>
                    </ul>
                </ScrolledBanner>
                <ScrolledBanner bannerNum="6" className="align-right">
                    <h3>Expériences</h3>
                    <ul>
                        <li>
                            Software Engineer Full-Stack — Mukiz (Alternance),
                            Déc. 2024 – Déc. 2026
                        </li>
                        <li>
                            Nythral — RPG procédural / simulation (C#/.NET,
                            Unreal Engine), 2026
                        </li>
                        <li>Musicien professionnel, 2017–2024</li>
                    </ul>
                </ScrolledBanner>
            </div>
        </main>
    )
}

export default ExperiencePage
