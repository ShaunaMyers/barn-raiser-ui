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
          <h1>BarnRaiser</h1>
        </Link>
      </header>
      <Route exact path="/" render={() => {
        return (
          <section className="main-container">
            <h2>Are You Looking for Assistance?</h2>
            <Link to="/NeedForm">
              <button>I Need Help</button>
            </Link>
            <h3>Can You Offer Assistance?</h3>
            <Link to="/NeedList">
              <button>Give Help</button>
            </Link>
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
