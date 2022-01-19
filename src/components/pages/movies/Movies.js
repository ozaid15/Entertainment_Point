import axios from 'axios';
import React, { useState, useEffect} from 'react'
import useGenras from '../../../hooks/useGenras';
import CustomPagination from '../CustomPagination';
import SingleComponent from '../SingleComponent';
import Genras from '../Genras';


function Movies() {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const [noOfPages, setNoOfpages] = useState();
    const [selectedGeneras, setSelectedGeneras] = useState([]);
    const [generas, setGeneras] = useState([]);
    const genreIds = useGenras(selectedGeneras)

    useEffect( () => {
        window.scroll(0,0);
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreIds}&with_watch_monetization_types=flatrate`)
        .then( (response) => {
            setContent(response.data.results);
            setNoOfpages(response.data.total_pages)
            
        })
        .catch( err => {
            console.log('somthing wrong');
        })
    },[page, genreIds])

    return (
        <div>
            <span className='page-name'>Discover Movie's</span>
            <Genras 
                selectedGeneras={selectedGeneras}
                setSelectedGeneras={setSelectedGeneras}
                generas={generas}
                setGeneras={setGeneras}
                setPage={setPage}
                type='movie'
            />
            <div className='trending'>
                {
                    content && content.map( data => 
                        <SingleComponent 
                            key={data.id} 
                            data={data} 
                            media_type='movie'
                        /> 
                    )
                }
            </div>
            {
                noOfPages>1 && <CustomPagination setPage={setPage} noOfPages={noOfPages}/>
            }
        </div>
    )
}

export default Movies
