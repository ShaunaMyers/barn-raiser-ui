import './NeedList.css';
import Need from "../Need/Need";

const NeedList = ({ needs }) => {

    const allNeeds = needs.map(need => {
        return <Need key={need.id} id={need.id} pointOfContact={need.point_of_contact} title={need.title} description={need.description} startTime={need.start_time} endTime={need.end_time} zipCode={need.zip_code} supporters={need.requested_supporters}/>
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