import './gameProjectile.scss'
import playerBeam from '../../assets/images/gamePageAssets/playerBeam.png'
import ennemyBeam from '../../assets/images/gamePageAssets/ennemyBeam.png'

const Projectile = ({ x, y, type }) => {
    return (
        <img
            src={type === 'player' ? playerBeam : ennemyBeam}
            alt="projectile"
            className={`projectile ${
                type === 'player' ? 'player-proj' : 'enemy-proj'
            }`}
            style={{
                left: `${x}px`,
                top: `${y}px`,
            }}
        />
    )
}

export default Projectile
