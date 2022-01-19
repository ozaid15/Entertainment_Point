import { Container } from '@mui/material'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import '../stylesheet/body.css'
import Trending from './pages/trending/Trending'
import Movies from './pages/movies/Movies'
import Series from './pages/series/Series'
import Search from './pages/search/Search'

function Body() {
    return (
        <div className='body'>
            <Container>
                <Routes>
                    <Route path='/' element={<Trending />} exact />
                    <Route path='/movies' element={<Movies />} />
                    <Route path='/tvseries' element={<Series />} />
                    <Route path='/search' element={<Search />} />
                </Routes>
            </Container>
        </div>
    )
}

export default Body
