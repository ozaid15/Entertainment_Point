import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SingleComponent from '../SingleComponent';
import './trending.css';
import CustomPagination from '../CustomPagination';

function Trending() {
    const [content, setContent] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        window.scroll(0,0);
        axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`)
        .then((response)=> {
            setContent(response.data.results)
        })
        .catch( err => {
            console.log(err);
        });
    }, [page])

    return (
        <div>
            <span className='page-name'>Trending Today</span>
            <div className='trending'>
                {
                    content && content.map( (element) => 
                        <SingleComponent 
                            key={element.id} 
                            data={element} 
                            media_type={element.media_type}
                        />
                    )
                }
            </div>
            <CustomPagination setPage={setPage}/>
        </div>
    )
}

export default Trending
