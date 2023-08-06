import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Navigation } from './components/Header/Navigation'
import { Branches } from './components/Branches/Branches'
import { Footer } from './components/Footer/Footer'
import { Feed } from './components/Feed/Feed'

function App() {
  return (
    <div>
      <Navigation></Navigation>
      <Branches></Branches>
      <Feed></Feed>
      <Footer></Footer>
    </div>
  );
}

export default App;
