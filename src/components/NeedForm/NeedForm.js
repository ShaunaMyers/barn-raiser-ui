import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import './NeedForm.css';

const ADD_NEED = gql`
    mutation createNeed($pointOfContact: String!, $title: String!, $description: String!, $startTime: String!, $endTime: String!, $zipCode: String!, $supportersNeeded: Int!) {

        createNeed( input: { pointOfContact: $pointOfContact, title: $title, description: $description, startTime: $startTime, endTime: $endTime, zipCode: $zipCode, supportersNeeded: $supportersNeeded }) {
        need {
            id
            title
            description
            pointOfContact
            startTime
            endTime
            zipCode
            supportersNeeded
            status
          }
      errors
      }
    }
`;

const NeedForm = () => {

    const [pointOfContact, setPointOfContact] = useState('')
    const [zipCode, setZipCode] = useState(0);
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [supportersNeeded, setSupportersNeeded] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [addNeed, { data, loading, error }] = useMutation(ADD_NEED);

    if (loading) return 'Loading...';
    if (error) return `Submission error! ${error.message}`;


    const handleInputChange = (e) => {
      const { name, value } = e.target;
      name === 'email' && setPointOfContact(value);
      name === 'zipCode' && setZipCode(value);
      name === 'needDate' && setDate(value);
      name === 'startTime' && setStartTime(value);
      name === 'endTime' && setEndTime(value);
      name === 'volunteersNeeded' && setSupportersNeeded(parseInt(value));
      name === 'needTitle' && setTitle(value);
      name === 'needDescription' && setDescription(value);

    }

    // Still need to write logic for the date and the time
        // startTime and endTime are coming in from the backend as strings that include the date
        // Need to parse the date from startTime and endTime for display
        // Also need to logic to send back the date included in startTime and endTime

    const handleAddNeed = (e) => {
      e.preventDefault()
      addNeed({ variables: { pointOfContact, title, description, startTime, endTime, zipCode, supportersNeeded } })

    }

    return (
      <form>
        <label for="email">Contact Email:</label>
        <input onChange={handleInputChange} type="email" name="email" placeholder="Email Address" value={pointOfContact}/>
        <label for="zipCode">Zip Code:</label>
        {//should probably be a text input
        }
        <input onChange={handleInputChange} type="number" name="zipCode" placeholder="Zip Code" value={zipCode}/>
        <label for="needDate">Date:</label>
        <input onChange={handleInputChange} type="date" name="needDate" min={new Date().toISOString().slice(0,10)} max="2025-08-27"/>
        <label for="startTime">Start Time:</label>
        <input onChange={handleInputChange} type="time" name="startTime"/>
        <label for="endTime">End Time:</label>
        <input onChange={handleInputChange} type="time" name="endTime"/>
        <label for="volunteersNeeded">Number of Volunteers Needed:</label>
        <input onChange={handleInputChange} type="number" name="volunteersNeeded" min="1" max="100" value={supportersNeeded}/>
        <label for="needTitle">Title:</label>
        <input onChange={handleInputChange} type="text" name="needTitle" placeholder="Give your need a title" value={title}/>
        <label for="needDescription">Description:</label>
        <input onChange={handleInputChange} type="text" name="needDescription" placeholder="Describe your need" value={description} className="description-input"/>
        <button onClick={handleAddNeed} className="submit-button">Submit</button>
      </form>
    );
}

export default NeedForm;
