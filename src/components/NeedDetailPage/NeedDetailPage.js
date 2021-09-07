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

  if (loading) {
    return(
      <p>Loading...</p>
    )
  } else if (error) {
    return(
      <p>error</p>
    )
  } else {
    console.log(data);
    return (
      <section className="need-details">
        <h2>Title!</h2>
        <h3>id?</h3>
        <h3>Date</h3>
        <h3>Start Time - End Time</h3>
        <h3>Zip Code</h3>
        <h3>Categories</h3>
        <h3>Volunteers Needed</h3>
        <p>Description description description description description description description description description description description</p>
        <button>Contact Button</button>
        <button>Volunteer Button</button>
        <p>image??</p>
      </section>
    )
  }
}

export default NeedDetailPage;
