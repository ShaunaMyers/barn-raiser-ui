import './Need.css'
import { needsData } from "../../needsData";

const Need = ({ pointOfContact, title, description, startTime, endTime, zipCode, supporters }) => {
  return (
    <div className="need-container">
      <div className="need-description-info">
        <h4>{title}</h4>
        <p>{description}</p>
        <p>{zipCode}</p>
      </div>
      <div className="time-container">
        <p>{startTime}-</p>
        <p>{endTime}</p>
      </div>
      <div className="need-volunteer-info">
        <p>Volunteers needed: {supporters}</p>
        <p>Contact: {pointOfContact}</p>
      </div>
    </div>
   );
}

export default Need;
