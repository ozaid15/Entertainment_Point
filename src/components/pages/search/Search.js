import { Button, Tab, Tabs, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import CustomPagination from '../CustomPagination';
import axios from 'axios';
import SingleComponent from '../SingleComponent';

function Search() {

    const [textField, setTextField] = useState("")
    const [type, setType] = useState("movie");
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState(0);

    const handleChange = (event, newValue) => {
        setType(newValue);
        setPage(1);
    }

    const fetchSearch = async () => {
        try {
          const { data } = await axios.get(
            `https://api.themoviedb.org/3/search/${type}?api_key=${
              process.env.REACT_APP_API_KEY
            }&language=en-US&query=${textField}&page=${page}&include_adult=false`
          );
          setContent(data.results);
          setNumOfPages(data.total_pages);
        } catch (error) {
          console.error('something went wrrong');
        }
      };
    
      useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
        // eslint-disable-next-line
      }, [type, page]);

    return (
        <div>
            <div style={{display: 'flex', margin: "20px 0"}}>
                <TextField 
                    // id='filled-basic'
                    label='Search'
                    variant='filled'
                    style={{flex: 1}}
                    value={textField}
                    onChange={(e) => setTextField(e.target.value)}
                />
                <Button 
                    onClick={fetchSearch}
                    variant='contained' 
                    style={{marginLeft: 10}}
                > <SearchIcon /> </Button>
            </div>
            <Tabs 
                value={type}
                indicatorColor='primary'
                textColor='white'
                onChange={handleChange}
                style={{paddingBottom: 5}}
                aria-label="disabled tabs example"
            >
                <Tab style={{width: '50%'}} value="movie" label="Search Movies" />
                <Tab style={{width: '50%'}} value="tv" label="Search TV Series" />
            </Tabs>

            <div className='trending'>
                {
                    content && content.map( (element) => 
                        <SingleComponent 
                            key={element.id} 
                            data={element} 
                            media_type={type}
                        />
                    )
                }
                {
                    textField && !content && (<h1>Not Found</h1>)
                }
            </div>
            
            {
                numOfPages > 1 && <CustomPagination setPage={setPage} noOfPages={numOfPages} />
            }
            
        </div>
    )
}

export default Search
