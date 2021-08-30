import { useState } from 'react';
import './NeedForm.css';

const NeedForm = () => {

    const [email, setEmail] = useState('')
    const [zipCode, setZipCode] = useState(0);
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [volunteers, setVolunteers] = useState(0);
    const [description, setDescription] = useState('');


    return ( 
        <form>
            <input type="email" name="email" placeholder="Email Address"/>
            <input type="text" name="zip-code" placeholder="Zip Code"/>
            <input type="date" name="need-date" min={new Date().toISOString().slice(0,10)} max="2025-08-27"/>
            <input type="time" name="start-time"/>
            <input type="time" name="end-time"/>
            <input type="number" name="volunteers-needed" min="1" max="100"/>
            <input type="text" name="need-description" placeholder="Describe your need"/>
            <button>Submit</button>
        </form>
     );
}
 
export default NeedForm;