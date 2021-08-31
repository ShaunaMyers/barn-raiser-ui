// import { useState, useEffect } from 'react';
import './App.css';
import NeedForm from '../NeedForm/NeedForm';
import NeedList from '../NeedList/NeedList';
import { Route, Link } from 'react-router-dom';
// import { needsData } from '../../needsData';
import { useQuery, gql } from '@apollo/client';

function App() {

  const allActiveNeedsQuery = gql`{
    allActiveNeeds{
      id
      title
      description  
      pointOfContact
      startTime 
      endTime 
      zipCode 
      supportersNeeded
      status
    }
  }`;

  const { loading, error, data } = useQuery(allActiveNeedsQuery);

  if (loading) {
    return(
      <p>Loading...</p>
    )
  } else if (error) {
    return(
      <p>error</p>
    )
  } else {
    console.log('data', data)
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
              <NeedForm/>
              )
            }}/>
          <Route exact path="/NeedList" render={() => {
            return (
              <NeedList needs={data.allActiveNeeds} />
              )
            }}/>
        </main>
    );
  }
}

export default App;
