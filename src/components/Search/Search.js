import { useState } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './Search.css';

const Search = ({ handleSearchSubmit, handleViewAllNeeds }) => {

    const [zipCodeBox, setZipCodeBox] = useState(false);
    const [dateBox, setDateBox] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successfulSearch, setSuccessfulSearch] = useState(false);

    const onSearchSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessfulSearch(false);
        if (searchInput && zipCodeBox) {
            executeSuccessfulSearch(searchInput, 'zipCode')
        } else if (searchInput && dateBox) {
            executeSuccessfulSearch(searchInput, 'startTime');
        } else if (!zipCodeBox && !dateBox){
            setErrorMessage('Please check a box to complete your search')
        } else {
            setErrorMessage('Please enter text to complete your search')
        }
    }

    const executeSuccessfulSearch = (input, type) => {
        if (type === 'startTime') {
            const splitSearch = searchInput.split('/');
            const reformattedSearch = `${splitSearch[2]}-${splitSearch[0]}-${splitSearch[1]}`
            handleSearchSubmit(reformattedSearch, type);
        } else {
            handleSearchSubmit(input, type);
        }
        setSuccessfulSearch(true);
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

    const onViewAllNeeds = () => {
        handleViewAllNeeds();
        setSuccessfulSearch(false);
        clearInputs()
    }

    const clearInputs = () => {
        setSearchInput('');
        setZipCodeBox(false);
        setDateBox(false);
    }

    return ( 
            <form>
                <input onChange={(e) => setSearchInput(e.target.value)} type="text" name="search" placeholder="Search for need entries" value={searchInput}/>
                    <div className="checkbox-container">
                            <input onChange={() => changeCheckedBoxes(2)} className="checkboxes" type="checkbox" id="dateBox" checked={dateBox}/>
                            <label className="checkbox-label" htmlFor="dateBox">Date</label>
                            <input onChange={() => changeCheckedBoxes(1)} className="checkboxes" type="checkbox" id="zipCodeBox" checked={zipCodeBox}/>
                            <label className="checkbox-label" htmlFor="zipCodeBox">Zip Code</label>
                            <input onChange={() => changeCheckedBoxes(3)} className="checkboxes" type="checkbox" id="categoryBox" checked={categoryBox}/>
                            <label className="checkbox-label" htmlFor="categoryBox">Category</label>
                    </div>
                <button onClick={onSearchSubmit} className="search-button">Search</button>
                {successfulSearch && 
                <a onClick={onViewAllNeeds} className="see-all-link">See All Needs</a>
                }
                {errorMessage &&
                    <ErrorMessage errorMessage={errorMessage}/>
                }
            </form>
     );
}
 
export default Search;