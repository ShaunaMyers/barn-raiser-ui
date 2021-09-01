import './Need.css'
import { needsData } from "../../needsData";

const Need = ({ pointOfContact, title, description, startTime, endTime, zipCode, supporters }) => {
  return (
    <div className="need-container">
      <div className="need-info">
        <h4>{title}</h4>
        <p className="bold">Details:</p>
        <p>{description}</p>
        <p className="bold">{zipCode}</p>
      </div>
      <div className="time-container">
        <p>{startTime} -- </p>
        <p>{endTime}</p>
      </div>
      <div className="need-info">
        <p className="bold">Volunteers Needed:</p>
        <p>{supporters}</p>
        <p className="bold">Contact:</p>
        <p>{pointOfContact}</p>
      </div>
      <div className="button-container">
        <button className="volunteer-button">Volunteer</button>
      </div>
    </div>
   );
}

export default Need;
