import React from 'react';
import './App.css';
import logo from './logo 2.png';
import Post from './Post'


function App() {
  return (
    <div className="App">
      <div className="App__header">
        <img className="App__headerImage" src={logo} alt="logo"/>
      </div>

      <Post />
      <Post />
      <Post />
      <Post />

    </div>
  );
}

export default App;
