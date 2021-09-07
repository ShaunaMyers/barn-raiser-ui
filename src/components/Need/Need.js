import './Need.css'
import { NavLink } from 'react-router-dom'

const Need = ({ pointOfContact, title, categories, description, date, startTime, endTime, zipCode, supporters, id }) => {

  const formatCategoriesText = (tag, index) => {
    if (categories.length === 2 && index === 0) return `${tag}  •  `
    else if (index !== 0 && index !== categories.length - 1) return `  •  ${tag}  •  `
    else return tag
  }

  const allCategories = categories.map((category, index) => {
    return <p key={category.id}>{formatCategoriesText(category.tag, index)}</p>
  })


  return (
    <div className="need-container">
      <div className="need-info">
        <h4>{title}</h4>
        <p className="bold">Categories:</p>
        <div className="category-container">{allCategories}</div>
        <p className="bold">{zipCode}</p>
        <p>{date}</p>
      </div>
      <div className="time-container">
        <p>{startTime} - </p>
        <p>{endTime}</p>
      </div>
      <div className="need-info">
        <p className="bold">Volunteers Needed:</p>
        <p>{supporters}</p>
      </div>
      <div className="button-container">
        <NavLink to={`/Need/${id}`}><button className="more-info-button">More Info</button></NavLink>
      </div>
    </div>
   );
}

export default Need;
