import './NeedDetailPage.css'
import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

const NeedDetailPage = ({need_id}) => {
  //call API to get need corresponding to this id
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
    return "TIME"
  }

  const formatDate = (date) => {
    return "DATE"
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
    console.log(need);
    return (
      <section className="need-details">
        <h2>{need.title}</h2>
        <h3>{need.id}</h3>
        <h3>{formatDate(need.startTime)}</h3>
        <h3>{formatTime(need.startTime)} - {formatTime(need.endTime)}</h3>
        <h3>{need.zipCode}</h3>
        <h3>{need.categories}</h3>
        <h3>Volunteers Needed: {need.supportersNeeded}</h3>
        <p>{need.description}</p>
        <button>Contact Button</button>
        <button>Volunteer Button</button>
        <p>image??</p>
      </section>
    )
  }
}

export default NeedDetailPage;
