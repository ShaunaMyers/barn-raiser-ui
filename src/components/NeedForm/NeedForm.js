import React, { useState } from 'react';
import './NeedForm.css';

const NeedForm = ({ addNeed }) => {

    const [pointOfContact, setPointOfContact] = useState('')
    const [zipCode, setZipCode] = useState(0);
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [supportersNeeded, setSupportersNeeded] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        name === 'email' && setPointOfContact(value);
        name === 'zipCode' && setZipCode(value);
        name === 'needDate' && setDate(value);
        name === 'startTime' && setStartTime(value);
        name === 'endTime' && setEndTime(value);
        name === 'volunteersNeeded' && setSupportersNeeded(value);
        name === 'needTitle' && setTitle(value);
        name === 'needDescription' && setDescription(value);
    }

    const handleAddNeed = () => {
        addNeed({ id: Math.random(), title, description, pointOfContact, startTime, endTime, zipCode, supportersNeeded })
    }

    return ( 
        <form>
            <input onChange={handleInputChange} type="email" name="email" placeholder="Email Address" value={pointOfContact}/>
            <input onChange={handleInputChange} type="number" name="zipCode" placeholder="Zip Code" value={zipCode}/>
            <input onChange={handleInputChange} type="date" name="needDate" min={new Date().toISOString().slice(0,10)} max="2025-08-27"/>
            <input onChange={handleInputChange} type="time" name="startTime"/>
            <input onChange={handleInputChange} type="time" name="endTime"/>
            <input onChange={handleInputChange} type="number" name="volunteersNeeded" min="1" max="100" value={supportersNeeded}/>
            <input onChange={handleInputChange} type="text" name="needTitle" placeholder="Give your need a title" value={title}/>
            <input onChange={handleInputChange} type="text" name="needDescription" placeholder="Describe your need" value={description}/>
            <button onClick={handleAddNeed}>Submit</button>
        </form>
     );
}
 
export default NeedForm;