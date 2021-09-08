import './App.css';
import NeedForm from '../NeedForm/NeedForm';
import NeedList from '../NeedList/NeedList';
import Search from '../Search/Search';
import Admin from '../Admin/Admin';
import { useState } from 'react';
import { Route, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import NeedDetailPage from '../NeedDetailPage/NeedDetailPage';

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
    };
    !foundResults.length && setNoMatches('Sorry, no needs match your search. Please enter different search criteria.');
    setTimeout(() => { setNoMatches(''); }, 3000);
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
    return (
        <main>
          <header>
            <Route exact path={["/", "/NeedList", "/NeedForm"]} render={() => {
              return (
                <Link to="/">
                  <h1 className="logo">BarnRaiser</h1>
                </Link>
              )
            }}/>
            <Route exact path={["/NeedList", "/NeedForm"]} render={() => {
              return (
              <Link to="/">
                <button className="return-home-button">Return Home</button>
              </Link>
              )
            }}/>
            <Route exact path="/AdminView" render={() => {
              return (
                <Link to="/">
                  <h1 className="logo">BarnRaiser- Administrator View</h1>
                </Link>
              )
            }}/>
          </header>
          <Route exact path="/AdminView" render={() => {
            return (
              <Admin />
            )
          }}/>
          <Route exact path="/" render={() => {
            return (
              <section className="main-container">
                <img src="https://c.stocksy.com/a/tk2400/z9/963907.jpg" className="banner-img" alt="Two hands reaching out towards one another" />
                <div className="intro-text">
                  <h2 className="header-text">Are You Looking for Assistance?</h2>
                  <Link to="/NeedForm">
                    <button>I Need Help</button>
                  </Link>
                  <h2 className="header-text">Can You Offer Assistance?</h2>
                  <Link to="/NeedList">
                    <button>Give Help</button>
                  </Link>
                </div>
              </section>
            )
          }}/>
          <Route exact path="/Need/:id" render={({ match }) => {
            return (
              <NeedDetailPage need_id={match.params.id} />
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
                <Search handleSearchSubmit={handleSearchSubmit} handleViewAllNeeds={handleViewAllNeeds} searchResults={searchResults}/>
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
        </main>
    );
  }
}

export default App;
