import './NeedList.css';
import Need from "../Need/Need";

const NeedList = ({ needs }) => {

    const allNeeds = needs.map(need => {
        return <Need key={need.id} id={need.id} pointOfContact={need.pointOfContact} title={need.title} description={need.description} startTime={need.startTime} endTime={need.endTime} zipCode={need.zipCode} supporters={need.supportersNeeded}/>
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