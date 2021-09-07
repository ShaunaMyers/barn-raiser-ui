import './NeedDetailPage.css'
import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { NavLink } from 'react-router-dom';

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

  const { loading, error, data } = useQuery(SINGLE_NEED_QUERY);

  const formatTime = (time) => {
    const splitTime = time.split(" ")
    const reformattedTime = splitTime[1]
    return reformattedTime
  }

  const formatDate = (date) => {
    const splitDate = date.split(" ")
    return splitDate[0]
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
      <section className="need-details">
        <div className="detail-text">
          <NavLink to="/NeedList"><button className="back-button">Back</button></NavLink>
          <h2>{need.title}</h2>
          <h3>{need.id}</h3>
          <h3>{formatDate(need.startTime)}</h3>
          <h3>{formatTime(need.startTime)} - {formatTime(need.endTime)}</h3>
          <h3>{need.zipCode}</h3>
          <h3>{need.categories}</h3>
          <h3>Volunteers: {need.supporters.length} / {need.supportersNeeded}</h3>
          <p>{need.description}</p>
        </div>
        <div className="volunteer-action-container">
          <a href={`mailto:${need.pointOfContact}?subject=RE:${need.title}`}><button className="contact-button">Contact Requester</button></a>
          <NavLink to="/"><button className="volunteer-button">Sign Up to Volunteer</button></NavLink>
        </div>
      </section>
    )
  }
}

export default NeedDetailPage;
