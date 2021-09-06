import './App.css';
import NeedForm from '../NeedForm/NeedForm';
import NeedList from '../NeedList/NeedList';
import Search from '../Search/Search';
import { useState } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export const NEEDS_QUERY = gql`{
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
    categories
      {
      id
      tag
      }
  }
}`;

function App() {

  const [searchResults, setSearchResults] = useState([]);
  const [noMatches, setNoMatches] = useState('')
  const { loading, error, data } = useQuery(NEEDS_QUERY);

  const handleSearchSubmit = (searchInput, type) => {
    let foundResults = [];
    if (type === 'categories') {  
      data.allActiveNeeds.forEach(need => {
        need[type].forEach(category => category.tag === searchInput && foundResults.push(need));
      });
    } else if (type === 'startTime') {
      foundResults = data.allActiveNeeds.filter(need => need[type].slice(0, 10) === searchInput);
    } else {
      foundResults = data.allActiveNeeds.filter(need => need[type] === searchInput)
    }
    !foundResults.length && setNoMatches('Sorry, no needs match your search. Please enter different search criteria.')
    setSearchResults(foundResults);
  }

  const handleViewAllNeeds = () => {
    setSearchResults([]);
    setNoMatches('')
  }

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
              <NeedForm/>
              )
            }}/>
          <Route exact path="/NeedList" render={() => {
            return (
              <section>
                <Search handleSearchSubmit={handleSearchSubmit} handleViewAllNeeds={handleViewAllNeeds}/>
                {noMatches &&
                  <ErrorMessage className="matchError" errorMessage={noMatches}/>
                }
                <NeedList needs={
                  searchResults.length ? searchResults :
                  data.allActiveNeeds
                } />
              </section>
              )
            }}/>
            <Route
              render={() => {
                return (
                  <Redirect to="/" />
                )
              }}
            />
        </main>
    );
  }
}

export default App;
