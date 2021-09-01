import { useState } from 'react';
import { Route } from 'react-router-dom';
import './Search.css';

const Search = () => {

    const [zipCodeBox, setZipCodeBox] = useState(false);
    const [dateBox, setDateBox] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [isError, setIsError] = useState(false);

    const onSearchSubmit = () => {
        e.preventDefault();
        // Check if checked1 or 2 have value
        // AND check if searchInput has value
        // If so, pass checkBox and searchData up to App
        // If not use Error component to display a message 
        if (searchInput && zipCodeBox) {
            handleSearchSubmit(searchInput, 'zipCode');
        } else if (searchInput && dateBox) {
            handleSearchSubmit(searchInput, 'date');
        } else {
            setIsError(true)
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
            </form>
        //     )
        // }}/>
     );
}
 
export default Search;