import { useState } from 'react';
import { Route } from 'react-router-dom';
import './Search.css';

const Search = () => {

    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    const handleSearchSubmit = () => {

    }

    const changeCheckedBoxes = (num) => {
        if (num === 1) {
            setIsChecked1(true);
            setIsChecked2(false);
        } else {
            setIsChecked2(true);
            setIsChecked1(false);
        }
    }

    return ( 
        <Route exact path="/NeedList" render={() => {
            return (
            <form>
                <input onChange={(e) => setSearchInput(e.target.value)} type="text" name="search" placeholder="Search for need entries" value={searchInput}/>
                    <div className="checkbox-container">
                            <input onChange={() => changeCheckedBoxes(1)} className="zip-code-box" type="checkbox" id="zipCodeBox" checked={isChecked1}/>
                            <label for="zipCodeBox">Zip Code</label>
                            <input onChange={() => changeCheckedBoxes(2)} className="checkboxes" type="checkbox" id="dateBox" checked={isChecked2}/>
                            <label for="dateBox">Date</label>
                    </div>
                <button onClick={handleSearchSubmit} className="search-button">Search</button>
            </form>
            )
        }}/>
     );
}
 
export default Search;