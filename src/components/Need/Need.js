import './Need.css'
import { needsData } from "../../needsData";

const Need = ({ pointOfContact, title, description, startTime, endTime, zipCode, supporters }) => {
    return ( 
        <div className="need-container">
            <h4>{title}</h4>
            <p>{description}</p>
            <p>{zipCode}</p>
            <div className="time-container">
                <p>{startTime}-</p>
                <p>{endTime}</p>
            </div>
            <p>Volunteers needed: {supporters}</p>
            <p>Contact: {pointOfContact}</p>
        </div>
     );
}
 
export default Need;