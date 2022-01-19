import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { img_500, unavailable, unavailableLandscape} from '../../config/Config'
import { YouTube } from '@mui/icons-material';
import './contentModal.css'
import Carousel from '../carousel/Carousel';
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    
  },
}));

// const style = {
//     width: "90%",
//     height: "80%",
//     backgroundColor: "#39445a",
//     border: "1px solid #282c34",
//     borderRadius: 10,
//     color: "white",
//     p: 4,
// };

export default function ContentModal({children, media_type, id}) {
  const classes = useStyles();  
  const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [content, setContent] = useState();
    const [video, setVideo] = useState();

    const fetchData = async() => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

        setContent(data);
    }

    const fetchVideo = async() => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        setVideo(data.results[0]?.key)
    }

    useEffect(() => {
        fetchData();
        fetchVideo();
        // eslint-disable-next-line
    }, [])

    return (
    <>
      <div className='singleComponent' onClick={handleOpen}>
          {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        className={classes.modal}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {
              content && (
                <div className={classes.paper}>
                    <div className='contentModal'>
                        <img 
                          className='contentModal_portrait' 
                          alt={content.name || content.title} 
                          src={content.poster_path ? `${img_500}/${content.poster_path}` : unavailable} 
                        />
                        <img 
                          className='contentModal_landscape' 
                          alt={content.name || content.title} 
                          src={content.backdrop_path ? `${img_500}/${content.backdrop_path}` : unavailableLandscape} 
                        />
                        <div className='contentModal_about'>
                          <span className='contentModal_title'>
                            {content.name || content.title} (
                              {(
                                  content.first_air_date || content.release_date || "------"
                                ).substring(0,4)
                              }
                            )
                          </span>
                          { content.tagline && (
                            <i className='tagline'>{content.tagline}</i>
                          )}
                          <span className='content_description'>
                            {content.overview}
                          </span>

                          <div>
                            <Carousel media_type={media_type} id={id} />
                          </div>

                          <Button 
                            variant='contained'
                            startIcon={<YouTube />}
                            color='secondary'
                            target='__black'
                            href={`https://www.youtube.com/watch?v=${video}`}
                          >
                            Watch the Trailer
                          </Button>
                        </div>
                    </div>
                </div>
              )
            }
        </Fade>
      </Modal>
    </>
  );
}