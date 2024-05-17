import SoundcloudBtn from '../atoms/soundcloudBtn'
import './musicList.scss'

const MusicList = () => {
    return (
        <div className="music-list">
            <SoundcloudBtn />
            <iframe
                height="187"
                title="Jazz de Lune"
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1349618695&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
            ></iframe>
            <iframe
                height="187"
                title="Summon the Megalodon"
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/872887573&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
            ></iframe>
            <iframe
                height="187"
                title="Bantheme"
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/861886891&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
            ></iframe>
            <SoundcloudBtn />
        </div>
    )
}

export default MusicList
