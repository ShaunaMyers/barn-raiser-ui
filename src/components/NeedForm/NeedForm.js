import React, { useState } from 'react';
import './NeedForm.css';

const NeedForm = () => {

    const [email, setEmail] = useState('')
    const [zipCode, setZipCode] = useState(0);
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [volunteers, setVolunteers] = useState(0);
    const [description, setDescription] = useState('');


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        name === 'email' && setEmail(value);
        name === 'zipCode' && setZipCode(value);
        name === 'needDate' && setDate(value);
        name === 'startTime' && setStartTime(value);
        name === 'endTime' && setEndTime(value);
        name === 'volunteersNeeded' && setVolunteers(value);
        name === 'needDescription' && setDescription(value);
    }

    return ( 
        <form>
            <input onChange={handleInputChange} type="email" name="email" placeholder="Email Address" value={email}/>
            <input onChange={handleInputChange} type="number" name="zipCode" placeholder="Zip Code" value={zipCode}/>
            <input onChange={handleInputChange} type="date" name="needDate" min={new Date().toISOString().slice(0,10)} max="2025-08-27"/>
            <input onChange={handleInputChange} type="time" name="startTime"/>
            <input onChange={handleInputChange} type="time" name="endTime"/>
            <input onChange={handleInputChange} type="number" name="volunteersNeeded" min="1" max="100" value={volunteers}/>
            <input onChange={handleInputChange} type="text" name="needDescription" placeholder="Describe your need" value={description}/>
            <button>Submit</button>
        </form>
     );
}
 
export default NeedForm;