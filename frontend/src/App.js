import React from 'react';
import './App.css';
import TweetSavePage from './pages/TweetSavePage';

function App() {
  
  return (
    <div className="App">
      <header>
        <h2 className='main-heading'>Tweet Saver</h2>
      </header>
      <section>
        <TweetSavePage />
      </section>
     
    </div>
  );
}

export default App;
