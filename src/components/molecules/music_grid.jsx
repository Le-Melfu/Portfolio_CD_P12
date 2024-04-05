import React from 'react'

const MusicList = () => {
    const soundCloudStyle = {
        fontSize: 10,
        color: '#cccccc',
        lineBreak: 'anywhere',
        wordBreak: 'normal',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        fontFamily:
            'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
        fontWeight: 100,
    }
    const soundCloudStyleA = {
        color: '#cccccc',
        textDecoration: 'none',
    }
    return (
        <section id="extraitsoundcloud">
            <iframe
                title="soundcloud-extract-1"
                width="100%"
                height="300"
                scrolling="no"
                frameborder="no"
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1349585128&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
            ></iframe>
            <div style={soundCloudStyle}>
                <a
                    href="https://soundcloud.com/akelm-1"
                    title="Melfu"
                    style={soundCloudStyleA}
                >
                    Melfu
                </a>{' '}
                ·{' '}
                <a
                    href="https://soundcloud.com/akelm-1/waves-guthrie-govan-cover"
                    title="Waves - Guthrie Govan (Cover)"
                    style={soundCloudStyleA}
                >
                    Waves - Guthrie Govan (Cover)
                </a>
            </div>

            <iframe
                title="soundcloud-extract-2"
                width="100%"
                height="300"
                scrolling="no"
                frameborder="no"
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/858066592&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
            ></iframe>
            <div style={soundCloudStyle}>
                <a
                    href="https://soundcloud.com/akelm-1"
                    title="Melfu"
                    style={soundCloudStyleA}
                >
                    Melfu
                </a>{' '}
                ·{' '}
                <a
                    href="https://soundcloud.com/akelm-1/outtaspace-ambiant"
                    title="Outtaspace"
                    style={soundCloudStyleA}
                >
                    Outtaspace
                </a>
            </div>
        </section>
    )
}
export default MusicList
