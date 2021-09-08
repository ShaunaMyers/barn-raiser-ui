import './NeedList.css';
import Need from "../Need/Need";
import { formatDate } from '../../utils';

const NeedList = ({ needs }) => {

  const allNeeds = needs.map(need => {
    return <Need key={need.id} id={need.id}  title={need.title} date={formatDate(need.startTime)} zipCode={need.zipCode}/>
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
