import { useState, useEffect } from 'react';
import './App.css';
import NeedForm from '../NeedForm/NeedForm';
import NeedList from '../NeedList/NeedList';
import { Route, Link } from 'react-router-dom';
import { needsData } from '../../needsData';

function App() {

  const [ needs, setNeeds ] = useState([])

  useEffect(() => {
    setNeeds(needsData.allActiveNeeds)
  }, [])

  const addNeed = (newNeed) => {
    setNeeds([...needs, newNeed])
  }

  return (
    <main>
      <header>
        <Link to="/">
          <h1 className="logo">BarnRaiser</h1>
        </Link>
      </header>
      <Route exact path="/" render={() => {
        return (
          <section className="main-container">
            <img src="https://c.stocksy.com/a/tk2400/z9/963907.jpg" className="banner-img" alt="Two hands reaching out towards one another" />
            <div className="intro-text">
              <h2 className="header-text">Are You Looking for Assistance?</h2>
              <Link to="/NeedForm">
                <button>I Need Help</button>
              </Link>
              <h3 className="header-text">Can You Offer Assistance?</h3>
              <Link to="/NeedList">
                <button>Give Help</button>
              </Link>
            </div>
          </section>
        )
      }}/>
      <Route exact path="/NeedForm" render={() => {
        return (
          <NeedForm addNeed={addNeed}/>
        )
      }}/>
      <Route exact path="/NeedList" render={() => {
        return (
          <NeedList needs={needs} />
        )
      }}/>
    </main>
  );
}

export default App;
