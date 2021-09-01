import './Search.css';
import { Route } from 'react-router-dom';

const Search = () => {
    return ( 
        <Route exact path="/NeedList" render={() => {
            return (
            <form>
                <input type="text" name="search" placeholder="Search for need entries"/>
                    <div className="checkbox-container">
                            <input className="zip-code-box" type="checkbox" id="zipCodeBox"/>
                            <label for="zipCodeBox">Zip Code</label>
                            <input className="checkboxes" type="checkbox" id="dateBox"/>
                            <label for="dateBox">Date</label>
                    </div>
                <button className="search-button">Search</button>
            </form>
            )
        }}/>
     );
}
 
export default Search;