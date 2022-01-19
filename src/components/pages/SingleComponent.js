import { Badge } from '@mui/material';
import React from 'react'
import { img_300, unavailable } from '../../config/Config';
import './singleContent.css'
import ContentModal from '.././contentModal/ContentModal'

function SingleComponent(props) {
    const {data, media_type} = props;
    const {id,poster_path,title,name,first_air_date,release_date,vote_average} = data;
    
    return (
        <ContentModal media_type={media_type} id={id}>
            <Badge badgeContent={vote_average} color={vote_average > 6 ? 'primary' : 'secondary'} />
            <img className='poster' src={ poster_path ? `${img_300}/${poster_path}` : unavailable} alt='poster'/>
            <b className='title'>{title || name}</b>
            <span className='subtitle'>
                {media_type === "tv" ? "TV Series" : "Movie"}
                <span className='subtitle'>
                    {first_air_date || release_date}
                </span>
            </span>
        </ContentModal>
    );
}

export default SingleComponent
