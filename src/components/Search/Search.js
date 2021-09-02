import { useState } from 'react';
// import { Route } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './Search.css';

const Search = ({ handleSearchSubmit }) => {

    const [zipCodeBox, setZipCodeBox] = useState(false);
    const [dateBox, setDateBox] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const onSearchSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');
        if (searchInput && zipCodeBox) {
            handleSearchSubmit(searchInput, 'zipCode');
        } else if (searchInput && dateBox) {
            handleSearchSubmit(searchInput, 'date');
        } else if (!zipCodeBox && !dateBox){
            setErrorMessage('Please check a box to complete your search')
        } else {
            setErrorMessage('Please enter text to complete your search')
        }
    }

    const changeCheckedBoxes = (num) => {
        if (num === 1) {
            setZipCodeBox(true);
            setDateBox(false);
        } else {
            setDateBox(true);
            setZipCodeBox(false);
        }
    }

    return ( 
        // <Route exact path="/NeedList" render={() => {
        //     return (
            <form>
                <input onChange={(e) => setSearchInput(e.target.value)} type="text" name="search" placeholder="Search for need entries" value={searchInput}/>
                    <div className="checkbox-container">
                            <input onChange={() => changeCheckedBoxes(1)} className="zip-code-box" type="checkbox" id="zipCodeBox" checked={zipCodeBox}/>
                            <label for="zipCodeBox">Zip Code</label>
                            <input onChange={() => changeCheckedBoxes(2)} className="checkboxes" type="checkbox" id="dateBox" checked={dateBox}/>
                            <label for="dateBox">Date</label>
                    </div>
                <button onClick={onSearchSubmit} className="search-button">Search</button>
                {errorMessage &&
                    <ErrorMessage errorMessage={errorMessage}/>
                }
            </form>
        //     )
        // }}/>
     );
}
 
export default Search;