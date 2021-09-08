import './Need.css'
import { NavLink } from 'react-router-dom'

const Need = ({ title, categories, date, zipCode, id }) => {

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
        <p>{date}</p>
        <p className="bold">{zipCode}</p>
      </div>
      <div className="button-container">
        <NavLink to={`/Need/${id}`}><button className="more-info-button">More Info</button></NavLink>
      </div>
    </div>
   );
}

export default Need;
