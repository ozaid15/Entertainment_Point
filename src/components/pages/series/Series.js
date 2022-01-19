import axios from 'axios';
import React, { useState, useEffect } from 'react'
import useGenras from '../../../hooks/useGenras';
import CustomPagination from '../CustomPagination';
import Genras from '../Genras';
import SingleComponent from '../SingleComponent';

function Series() {

    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState(0);
    const [generas, setGeneras] = useState([]);
    const [selectedGeneras, setSelectedGeneras] = useState([]);
    const genraIds = useGenras(selectedGeneras);

    useEffect( () => {
        window.scroll(0,0);
        axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}&timezone=America%2FNew_York&with_genres=${genraIds}&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`)
        .then( (response) => {
            setContent(response.data.results);
            setNumOfPages(response.data.total_pages)
        })
        .catch( err => {
            console.log('something went wrong');
        })
    },[page, genraIds])

    return (
        <div>
            <span className='page-name'>Discover TV Series</span>

            <Genras 
                selectedGeneras={selectedGeneras}
                setSelectedGeneras={setSelectedGeneras}
                generas={generas}
                setGeneras={setGeneras}
                setPage={setPage}
                type='tv'
            />

            <div className='trending'>
                {
                    content && content.map( (element) => 
                        <SingleComponent 
                            key={element.id} 
                            data={element} 
                            media_type='tv'
                        />
                    )
                }
            </div>
            {
                numOfPages > 1 && <CustomPagination setPage={setPage}  noOfPages={numOfPages}/>
            }
            
        </div>
    )
}

export default Series
