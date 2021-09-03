import './NeedList.css';
import Need from "../Need/Need";

const NeedList = ({ needs }) => {

    const formatDate = (date) => {
        const formattedDate = new Date(date);
        const [month, day, year] = [(1 + formattedDate.getMonth()), formattedDate.getDate(), formattedDate.getFullYear()];
        const monthFormat = month > 9 ? month : '0' + month;
        return `${monthFormat}/${(day < 10) ? '0' + day : day}/${year}`;
    }

    const formatTime = (time) => {
        const shortenedTime = time.slice(11, 16);
        const [hours, minutes] = shortenedTime.split(':');
        return `${(hours > 12) ? hours - 12 : hours}:${minutes}${(hours >= 12) ? 'pm' : 'am'}`;
    }

    const allNeeds = needs.map(need => {
        return <Need key={need.id} id={need.id} pointOfContact={need.pointOfContact}  title={need.title} description={need.description} date={formatDate(need.startTime)} startTime={formatTime(need.startTime)} endTime={formatTime(need.endTime)} zipCode={need.zipCode} supporters={need.supportersNeeded}/>
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
