import { useState, useEffect } from 'react';
import './App.css';
import NeedForm from '../NeedForm/NeedForm';
import NeedList from '../NeedList/NeedList';
import { Route, Link } from 'react-router-dom';
import { needsData } from '../../needsData';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://barn-raiser-be.herokuapp.com/graphql',
  cache: new InMemoryCache()
});

function App() {

  const [ needs, setNeeds ] = useState([])

  useEffect(() => {
    setNeeds(needsData.allActiveNeeds)
  }, [])

  const addNeed = (newNeed) => {
    setNeeds([...needs, newNeed])
  }

  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}

export default App;
