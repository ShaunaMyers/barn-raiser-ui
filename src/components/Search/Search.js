import { useState } from 'react';
import { Route } from 'react-router-dom';
import './Search.css';

const Search = () => {

    const [isChecked, setIsChecked] = useState(false);

    return ( 
        <Route exact path="/NeedList" render={() => {
            return (
            <form>
                <input type="text" name="search" placeholder="Search for need entries"/>
                    <div className="checkbox-container">
                            <input className="zip-code-box" type="checkbox" id="zipCodeBox" checked={isChecked}/>
                            <label for="zipCodeBox">Zip Code</label>
                            <input className="checkboxes" type="checkbox" id="dateBox" checked={isChecked}/>
                            <label for="dateBox">Date</label>
                    </div>
                <button className="search-button">Search</button>
            </form>
            )
        }}/>
     );
}
 
export default Search;