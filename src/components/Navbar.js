import React, { useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import TrendingIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SearchIcon from '@mui/icons-material/Search';
import '../stylesheet/navbar.css';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "#2d313a",
    zIndex: 100,
  },
});

function ButtomNavbar() {
  const classes = useStyles();
  const [value, setValue] = useState();
  const navigate = useNavigate();
  
  return (
    <Box sx={{ backgroundColor: '#2d313a' }}  className="navbar">
      <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
            setValue(newValue);
            }}
            className={classes.root}
        >
        <BottomNavigationAction 
            style={{ color: "white" }}
            label="Trending" 
            icon={<TrendingIcon />}
            onClick={() => navigate('/')}
        />
        <BottomNavigationAction 
            style={{ color: "white" }}
            label="Movies" 
            icon={<MovieIcon />} 
            onClick={() => navigate('/movies')}
        />
        <BottomNavigationAction 
            style={{ color: "white" }}
            label="TV Series" 
            icon={<LiveTvIcon />} 
            onClick={() => navigate('/tvseries')}
        />
        <BottomNavigationAction 
            style={{ color: "white" }}
            label="Search" 
            icon={<SearchIcon />} 
            onClick={() => navigate('/search')}
        />
      </BottomNavigation>
    </Box>
  );
}

export default ButtomNavbar;