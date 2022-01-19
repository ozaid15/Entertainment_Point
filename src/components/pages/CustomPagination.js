import { Pagination } from '@mui/material'
import React from 'react'
import { createTheme } from '@mui/system';
import { ThemeProvider } from '@material-ui/styles';

const theme = createTheme({
    palette: {
        type: "dark",
    },
})

function CustomPagination({setPage, noOfPages=10}) {
    const handleChange = (e) => {
        setPage(e.target.textContent)
        window.scroll(0,0)
    };

    return (
        <div style={{
            width: "100%",
            display: 'flex',
            justifyContent: 'center',
            marginTop: 10
        }}>
            
            <ThemeProvider theme={theme}>
                <Pagination 
                    count={noOfPages}
                    onChange={ (e) => {handleChange(e)} }
                    color='primary'
                    style={{ color: "white" }}
                />
            </ThemeProvider>
        </div>
    )
}

export default CustomPagination
