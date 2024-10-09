const Projectile = ({ x, y }) => {
    return (
        <div
            className="projectile"
            style={{
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`,
                width: '4px',
                height: '15px',
                backgroundColor: 'red', // Changez cela par une image de projectile si besoin
            }}
        />
    )
}

export default Projectile
