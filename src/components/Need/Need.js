import './Need.css'
import { NavLink } from 'react-router-dom'

const Need = ({ title, date, zipCode, id }) => {

  return (
    <div className="need-container">
      <div className="need-info">
        <h4>{title}</h4>
        <p>{date}</p>
        <p className="bold">{zipCode}</p>
      </div>
      <div className="button-container">
        <NavLink to={`/Need/${id}`}><button className="more-info-button">More Info</button></NavLink>
      </div>
    </div>
   );
}

export default Need;
