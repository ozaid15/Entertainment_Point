import { Chip } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react'


function Genras(props) {
    const { selectedGeneras, setSelectedGeneras, generas, setGeneras, setPage, type } = props;
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        .then( (response) => {
            setGeneras(response.data.genres);
        })
        .catch( err => {
            console.log('something went wrong')
        })

        return () => {
            setGeneras({})
        }
        // eslint-disable-next-line
    }, [])
    
    const handleClick = (genera) => {
        setSelectedGeneras([...selectedGeneras, genera]);
        setGeneras(generas.filter( (g) => g.id !== genera.id));
        setPage(1);
    }
    
    const handleDelete = (genera) => {
        setSelectedGeneras(selectedGeneras.filter( (selected) => selected.id !== genera.id));
        setGeneras([...generas, genera]);
        setPage(1);
    }

    return (
        <div style={{padding: "6px 0px"}}>
            {
                selectedGeneras.length > 0 &&
                selectedGeneras.map( (element) => 
                    <Chip 
                        clickable
                        label={element.name}
                        key={element.id}
                        onDelete={() => handleDelete(element)}
                        style={{margin: 2, backgroundColor: 'primary'}}
                        color='primary'
                    />
                )
            }
            {
                generas.length > 0 && 
                generas.map( element => 
                    <Chip 
                        clickable
                        key={element.id}
                        label={element.name}
                        style={{margin: 2, backgroundColor: 'white'}}
                        // size='small'
                        onClick={() => handleClick(element)}
                    />
                )
            }
        </div>
    )
}

export default Genras
