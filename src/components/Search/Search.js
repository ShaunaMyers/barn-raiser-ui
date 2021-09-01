import './Search.css';
import { Route } from 'react-router-dom';

const Search = () => {
    return ( 
        <Route exact path="/NeedList" render={() => {
            return (
            <form>
                <input type="text" name="search" placeholder="Search for need entries"/>
                <button className="search-button">Search</button>
            </form>
            )
        }}/>
     );
}
 
export default Search;