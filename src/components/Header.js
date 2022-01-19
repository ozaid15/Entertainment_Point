import React from 'react'
import '../stylesheet/header.css'

function Header() {
    return (
        <div className='header'>
            <span onClick={() => window.scroll(0,0)}>🎬 ENTERTAINMENT POINT 🎥</span>
        </div>
    )
}

export default Header