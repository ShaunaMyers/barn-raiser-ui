import './NeedList.css';
import Need from "../Need/Need";
import { formatDate, formatTime } from '../../utils';

const NeedList = ({ needs }) => {

  const allNeeds = needs.map(need => {
    return <Need key={need.id} id={need.id} pointOfContact={need.pointOfContact}  title={need.title} categories={need.categories} description={need.description} date={formatDate(need.startTime)} startTime={formatTime(need.startTime)} endTime={formatTime(need.endTime)} zipCode={need.zipCode} supporters={need.supportersNeeded}/>
  })

  return (
    <article>
      <div className="all-needs">
        {allNeeds}
      </div>
    </article>
   );
}

export default NeedList;
