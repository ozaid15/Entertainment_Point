import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Body from './components/Body';
import Header from './components/Header';
import ButtomNavbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Header />
          <Body />
          <ButtomNavbar />
        </div>
      </BrowserRouter>
  );
}

export default App;