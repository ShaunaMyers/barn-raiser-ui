import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import './NeedForm.css';
import { NEEDS_QUERY } from '../App/App';

import ErrorMessage from '../ErrorMessage/ErrorMessage';

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
    const [isError, setIsError] = useState(false);
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

    const checkUserInput = ({variables}) => {
      const needKeys = Object.keys(variables)
      let error = false;
      let erroredInputs = [];
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
            if (endTime < startTime) {
                error = true;
                return;
            } 
        }
      })
      return error;
    }

    const clearInputs = () => {
      setPointOfContact('')
      setZipCode('')
      setDate('')
      setStartTime('')
      setEndTime('')
      setSupportersNeeded(0)
      setTitle('')
      setDescription('')
    }

    const handleAddNeed = (e) => {
      e.preventDefault()
      setIsError(false)
      setIsSubmitted(false)
      const newNeed = { variables: { pointOfContact, title, description, startTime: formatTimeWithDate(startTime), endTime: formatTimeWithDate(endTime), zipCode, supportersNeeded } };
      const isThereAnError = checkUserInput(newNeed)
      if (isThereAnError) {
        setIsError(true);
        return false;
      } else {
        addNeed(newNeed);
        setIsSubmitted(true);
        clearInputs();
      }
    }

    const formatTimeWithDate = (time) => {
        return `${date} ${time}`;
    }

    return (
      <form>
        {!!isSubmitted && <h3 className="success-message">Success! Your submission has been recorded. <Link to="/NeedList">Take me there.</Link></h3>}
        <label for="email">Contact Email:</label>
        <input onChange={handleInputChange} type="email" name="email" id="email" placeholder="Email Address" value={pointOfContact}/>
        <label for="zipCode">Zip Code:</label>
        <input onChange={handleInputChange} type="text" name="zipCode" id="zipCode" placeholder="Zip Code" value={zipCode}/>
        <label for="needDate">Date:</label>
        <input onChange={handleInputChange} type="date" name="needDate" id="needDate" min={new Date().toISOString().slice(0,10)} max="2025-08-27"/>
        <label for="startTime">Start Time:</label>
        <input onChange={handleInputChange} type="time" name="startTime" id="startTime"/>
        <label for="endTime">End Time:</label>
        <input onChange={handleInputChange} type="time" name="endTime" id="endTime"/>
        <label for="volunteersNeeded">Number of Volunteers Needed:</label>
        <input onChange={handleInputChange} type="number" name="volunteersNeeded" id="volunteersNeeded" min="1" max="100" value={supportersNeeded}/>
        <label for="needTitle">Title:</label>
        <input onChange={handleInputChange} type="text" name="needTitle" id="needTitle" placeholder="Give your need a title" value={title}/>
        <label for="needDescription">Description:</label>
        <input onChange={handleInputChange} type="text" name="needDescription" id="needDescription" placeholder="Describe your need" value={description} />
        {!!isError && <ErrorMessage errorMessage="Warning: Your submission could not go through." />}
        <button onClick={handleAddNeed} className="submit-button">Submit</button>
      </form>
    );
}

export default NeedForm;
