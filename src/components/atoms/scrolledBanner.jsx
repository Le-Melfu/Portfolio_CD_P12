import './scrolledBanner.scss'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const ScrolledBanner = ({ children, bannerNum, className }) => {
    gsap.registerPlugin(useGSAP)
    gsap.registerPlugin(ScrollTrigger)
    ScrollTrigger.normalizeScroll(true)

    useGSAP(() => {
        gsap.set('.banner3d-' + bannerNum, {
            perspectiveOrigin: 'center -100vh',
        })
        gsap.to('.banner3d-' + bannerNum, {
            scrollTrigger: {
                trigger: '.banner3d-' + bannerNum,
                scrub: true,
                start: 'top bottom',
                end: 'bottom top',
            },
            perspectiveOrigin: 'center 100vh',
            ease: 'none',
        })
    }, [])

    return (
        <div
            className={
                'xp__content-card banner ' + (className ? className : '')
            }
        >
            <div className={'banner3d-' + bannerNum}>
                <div className={'banner3d-' + bannerNum + '-front'}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ScrolledBanner
