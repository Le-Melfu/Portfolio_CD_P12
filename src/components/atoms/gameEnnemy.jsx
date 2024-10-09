import React from 'react'

const Enemy = ({ x, y, type }) => {
    return (
        <div
            className="enemy"
            style={{
                left: `${x}px`,
                top: `${y}px`,
                position: 'absolute',
                width: '50px',
                height: '50px',
                backgroundColor: 'red', // Change la couleur ou ajoute une image si nécessaire
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontSize: '12px',
                borderRadius: '5px',
            }}
        >
            {type}
        </div>
    )
}

export default Enemy
