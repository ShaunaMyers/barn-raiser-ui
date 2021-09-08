import './NeedDetailPage.css'
import { useState, useCallback } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { NavLink } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const NeedDetailPage = ({need_id}) => {
  const SINGLE_NEED_QUERY = gql`
    { need(id:${need_id})
    {
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
      supporters{
        id
        name
        email
      }
    }
  }`;

  const ADD_SUPPORTER = gql`
    mutation createSupporter($name: String!, $email: String!, $need: ID!) {
    createSupporter(input:
          {
            name: $name
            email: $email
            need: $need
          }
        )

        {
          supporter {
          id
          name
          email
          need
            {
              id
              title
              description
              pointOfContact
              startTime
              endTime
              zipCode
              supportersNeeded
              status
              categories{
            id
            tag
          }
            }
        }
        errors
      }
    }
  `;

  const { loading, error, data } = useQuery(SINGLE_NEED_QUERY);
  const [ signUpStarted, setSignUpStarted ] = useState(false);
  const [ volunteerName, setVolunteerName ] = useState('');
  const [ volunteerEmail, setVolunteerEmail ] = useState('');
  const [ isError, setIsError ] = useState(false);
  const [ isVolunteered, setIsVolunteered ] = useState(false);

  const [addSupporter, { supporterLoading, supporterError }] = useMutation(ADD_SUPPORTER, {
    refetchQueries: [{ query: SINGLE_NEED_QUERY }],
  });

  const formatTime = (time) => {
    const splitTime = time.split(" ")
    const reformattedTime = splitTime[1]
    return reformattedTime
  }

  const formatDate = (date) => {
    const splitDate = date.split(" ")
    return splitDate[0]
  }

  const onClick = () => {
    setSignUpStarted(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    name === 'name' && setVolunteerName(value);
    name === 'email' && setVolunteerEmail(value);
  }

  const clearInputs = () => {
    setVolunteerName('')
    setVolunteerEmail('')
    setSignUpStarted(false)
  }

  const checkIfError = (supporter) => {
    let error = false;
    if (!supporter.variables.name || !supporter.variables.email) {
      console.log(supporter.name)
      console.log(supporter.email)
      error = true;
    } else if (!supporter.variables.email.includes('@') || !supporter.variables.email.includes('.')) {
      error = true;
    }
    console.log(error);
    return error;
  }

  const handleAddSupporter = (e) => {
    e.preventDefault()
    setIsError(false)
    setIsVolunteered(false)
    const newSupporter = { variables: {
		      name: volunteerName,
		      email: volunteerEmail,
		      need: need_id
		    }}
    const isThereAnError = checkIfError(newSupporter);
    if (isThereAnError) {
      setIsError(true);
      clearInputs();
      return false;
    } else {
      addSupporter(newSupporter);
      setIsVolunteered(true);
      clearInputs();
    }
  }

  const formatCategories = (categories) => {
    const reformattedCategories = categories.map((category, index) => {
      return <p key={category.id}>{category.tag}</p>
    })
    return reformattedCategories;
  }

  if (loading) {
    return(
      <p>Loading...</p>
    )
  } else if (error) {
    return(
      <p>error</p>
    )
  } else {
    const need = data.need;
    return (
      <section>
        <div className="need-details">
          <div className="detail-text">
            <NavLink to="/NeedList"><button className="back-button">Back</button></NavLink>
            <h2>{need.title}</h2>
            <h3>{need.id}</h3>
            <h3>{formatDate(need.startTime)}</h3>
            <h3>{formatTime(need.startTime)} - {formatTime(need.endTime)}</h3>
            <h3>{need.zipCode}</h3>
            <h3>{formatCategories(need.categories)}</h3>
            <h3>Volunteers: {need.supporters.length} / {need.supportersNeeded}</h3>
            <p>{need.description}</p>
          </div>
          <div className="volunteer-action-container">
            <a href={`mailto:${need.pointOfContact}?subject=RE:${need.title}`}><button className="contact-button">Contact Requester</button></a>
            <button className="volunteer-button" onClick={onClick}>Sign Up to Volunteer</button>
          </div>
        </div>
        {!!signUpStarted && <div className="sign-up-container">
            <form className="sign-up-form">
              <label for="name">Your Name:</label>
              <input onChange={handleInputChange} type="text" name="name" id="name" placeholder="Your Name"></input>
              <label for="email">Your Email:</label>
              <input onChange={handleInputChange} type="email" name="email" id="email" placeholder="Email Address"></input>
              <button onClick={handleAddSupporter} className="submit-button">Sign Up</button>
            </form>
          </div>}
        {!!isError && <ErrorMessage errorMessage="Sorry, we weren't able to record your sign up."/>}
        {!!isVolunteered && <div className="signed-up-message">
            <h2>Thank you for signing up to help!</h2>
          </div>}
      </section>
    )
  }
}

export default NeedDetailPage;
