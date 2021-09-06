import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import './NeedForm.css';
import { NEEDS_QUERY } from '../App/App';

import ErrorMessage from '../ErrorMessage/ErrorMessage';

const ADD_NEED = gql`
    mutation createNeed($pointOfContact: String!, $title: String!, $description: String!, $startTime: String!, $endTime: String!, $zipCode: String!, $supportersNeeded: Int!, $categories: [ID!]!) {

        createNeed( input: { pointOfContact: $pointOfContact, title: $title, description: $description, startTime: $startTime, endTime: $endTime, zipCode: $zipCode, supportersNeeded: $supportersNeeded, categories: $categories }) {
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
            categories
              {
                id
                tag
              }
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
    const [deliveryChecked, setDeliveryChecked] = useState(false);
    const [handiworkChecked, setHandiworkChecked] = useState(false);
    const [foodPrepChecked, setFoodPrepChecked] = useState(false);
    const [transportationChecked, setTransportationChecked] = useState(false);
    const [organizingChecked, setOrganizingChecked] = useState(false);
    const [otherChecked, setOtherChecked] = useState(false);
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
      // let erroredInputs = [];
      needKeys.forEach((key) => {
        if (!variables[key]) {
          error = true;
          return;
        } else if (key === "zipCode") {
          if (variables[key].length !== 5) {
            error = true
            return;
          }
        } else if (key === "pointOfContact") {
          if (!variables[key].includes('@') || !variables[key].includes('.')) {
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
      const newNeed = { variables: { pointOfContact, title, description, startTime: formatTimeWithDate(startTime), endTime: formatTimeWithDate(endTime), zipCode, supportersNeeded, categories: findCategoryIds()} };
      console.log(newNeed, "NEW NEED")
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

    const findCategoryIds = () => {
      const categoryIds = []
      const categories = [otherChecked, organizingChecked, deliveryChecked, handiworkChecked, transportationChecked, foodPrepChecked];

      categories.forEach((category, index) => {
        category === true && categoryIds.push(index + 1)
      })
      return categoryIds;
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
        <label>Categories:</label>
        <input onChange={() => setDeliveryChecked(!deliveryChecked)} type="checkbox" name="delivery-checkbox" id="deliveryCheckbox" checked={deliveryChecked}/>
        <label htmlFor="deliveryCheckbox">Delivery</label>
        <input onChange={() => setHandiworkChecked(!handiworkChecked)} type="checkbox" name="handiwork-checkbox" id="handiworkCheckbox" checked={handiworkChecked}/>
        <label htmlFor="handiworkCheckbox">Handiwork</label>
        <input onChange={() => setFoodPrepChecked(!foodPrepChecked)} type="checkbox" name="food-prep-checkbox" id="foodPrepCheckbox" checked={foodPrepChecked}/>
        <label htmlFor="foodPrepCheckbox">Food Prep</label>
        <input onChange={() => setTransportationChecked(!transportationChecked)} type="checkbox" name="transportation-checkbox" id="transportationCheckbox" checked={transportationChecked}/>
        <label htmlFor="transportationCheckbox">Transportation</label>
        <input onChange={() => setOrganizingChecked(!organizingChecked)} type="checkbox" name="organizing-checkbox" id="organizingCheckbox" checked={organizingChecked}/>
        <label htmlFor="organizingCheckbox">Organizing/Event Management</label>
        <input onChange={() => setOtherChecked(!otherChecked)} type="checkbox" name="other-checkbox" id="otherCheckbox" checked={otherChecked}/>
        <label htmlFor="otherCheckbox">Other</label>
        {!!isError && <ErrorMessage errorMessage="Warning: Your submission could not go through. Please check that your inputs are correct and try again." />}
        <button onClick={handleAddNeed} className="submit-button">Submit</button>
      </form>
    );
}

export default NeedForm;
