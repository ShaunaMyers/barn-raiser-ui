import './NeedForm.css';

const NeedForm = () => {
    return ( 
        <form>
            <input type="email" name="email" placeholder="Email Address"/>
            <input type="text" name="zip-code" placeholder="Zip Code"/>
            <input type="date" name="need-date" min="2021-08-27" max="2025-08-27"/>
            <input type="time" name="start-time"/>
            <input type="time" name="end-time"/>
            <input type="number" name="volunteers-needed" min="1" max="100"/>
            <input type="text" name="need-description" placeholder="Describe your need"/>
            <button>Submit</button>
        </form>
     );
}
 
export default NeedForm;