import './NeedList.css';
import Need from "../Need/Need";

const NeedList = ({ needs }) => {

    const formatDate = (date) => {
        const formattedDate = new Date(date);
        const [month, day, year] = [(1 + formattedDate.getMonth()), formattedDate.getDate(), formattedDate.getFullYear()];
        const monthFormat = month > 9 ? month : '0' + month;
        return `${monthFormat}/${day}/${year}`;
    }

    const allNeeds = needs.map(need => {
        return <Need key={need.id} id={need.id} pointOfContact={need.pointOfContact} date={formatDate(need.startTime)} title={need.title} description={need.description} startTime={need.startTime} endTime={need.endTime} zipCode={need.zipCode} supporters={need.supportersNeeded}/>
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
