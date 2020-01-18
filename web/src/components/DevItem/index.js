import React from 'react'
import './styles.css'

function DevItem({ dev }) {
    return (
        <li className="dev-item">
            <header>
            <img src={dev.avatar_url ? dev.avatar_url : 'https://img.pngio.com/png-avatar-108-images-in-collection-page-3-png-avatar-300_300.png'} alt={dev.name}/>
            <div className="user-info">
                <strong>{dev.name}</strong>
                <span>{dev.techs.join(', ')}</span>
            </div>
            </header>
            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_username}`}>Link Github</a>
        </li>
    )
}

export default DevItem