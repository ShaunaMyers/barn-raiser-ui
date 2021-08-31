import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import './NeedForm.css';
import { NEEDS_QUERY } from '../App/App';

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
    const [zipCode, setZipCode] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [supportersNeeded, setSupportersNeeded] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [addNeed, { loading, error }] = useMutation(ADD_NEED, {
        refetchQueries: [{ query: NEEDS_QUERY }],
    });

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

    const checkUserInput = ({variables}) => {
      const needKeys = Object.keys(variables)
      let error = false;
      needKeys.forEach((key) => {
        if (!variables[key]) {
          error = true;
          return;
        } else if (key === "zipCode") {
          if (variables[key].length !== 5) {
            error = true
            return;
          }
        } else if (key === "endTime") {
          // check end time is not before start time
        }
      })
      return error;
    }

    const handleAddNeed = (e) => {
      e.preventDefault()
      const newNeed = { variables: { pointOfContact, title, description, startTime, endTime, zipCode, supportersNeeded } };
      const isThereAnError = checkUserInput(newNeed)
      if (isThereAnError) {
        return false;
      } else {
        addNeed(newNeed);
        setIsSubmitted(true);
      }
    }

    return (
      <form>
        <label for="email">Contact Email:</label>
        <input onChange={handleInputChange} type="email" name="email" id="email" placeholder="Email Address" value={pointOfContact}/>
        {/* conditional -- if errorMessage.email, render error message*/}
        <label for="zipCode">Zip Code:</label>
        <input onChange={handleInputChange} type="text" name="zipCode" id="zipCode" placeholder="Zip Code" value={zipCode}/>
        {/* conditional -- if errorMessage.zipCode, render error message*/}
        <label for="needDate">Date:</label>
        <input onChange={handleInputChange} type="date" name="needDate" id="needDate" min={new Date().toISOString().slice(0,10)} max="2025-08-27"/>
        {/* conditional -- if errorMessage.needDate, render error message*/}
        <label for="startTime">Start Time:</label>
        <input onChange={handleInputChange} type="time" name="startTime" id="startTime"/>
        {/* conditional -- if errorMessage.startTime, render error message*/}
        <label for="endTime">End Time:</label>
        <input onChange={handleInputChange} type="time" name="endTime" id="endTime"/>
        {/* conditional -- if errorMessage.endTime, render error message*/}
        <label for="volunteersNeeded">Number of Volunteers Needed:</label>
        <input onChange={handleInputChange} type="number" name="volunteersNeeded" id="volunteersNeeded" min="1" max="100" value={supportersNeeded}/>
        {/* conditional -- if errorMessage.volunteersNeeded, render error message*/}
        <label for="needTitle">Title:</label>
        <input onChange={handleInputChange} type="text" name="needTitle" id="needTitle" placeholder="Give your need a title" value={title}/>
        {/* conditional -- if errorMessage.needTitle, render error message*/}
        <label for="needDescription">Description:</label>
        <input onChange={handleInputChange} type="text" name="needDescription" id="needDescription" placeholder="Describe your need" value={description} />
        {/* conditional -- if errorMessage.needDescription, render error message*/}
        <button onClick={handleAddNeed} className="submit-button">Submit</button>
        {/* conditional -- if isError, render error message*/}
        {/* conditional -- if isSubmitted, render success message*/}
      </form>
    );
}

export default NeedForm;
