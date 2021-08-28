import { useState, useEffect } from 'react';
import './App.css';
import NeedForm from '../NeedForm/NeedForm';
import NeedList from '../NeedList/NeedList';
import { needsData } from '../../needsData';

function App() {

  const [ needs, setNeeds ] = useState([])

  useEffect(() => {
    setNeeds(needsData.allActiveNeeds)
  }, [])

  return (
    <main>
      <header>
        <h1>BarnRaiser</h1>
      </header>
      <section className="main-container">
        {/* <h2>Are You Looking for Assistance?</h2>
        <button>I Need Help</button>
        <h3>Can You Offer Assistance?</h3>
        <button>Give Help</button> */}
        {/* <NeedForm /> */}
        <NeedList needs={needs} />
      </section>
    </main>
  );
}

export default App;
