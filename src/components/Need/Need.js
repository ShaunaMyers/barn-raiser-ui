import './Need.css'

const Need = ({ pointOfContact, title, categories, description, date, startTime, endTime, zipCode, supporters }) => {

  const formatCategoriesText = (tag, index) => {
    if (index !== 0 && index !== categories.length - 1) return `  •  ${tag}  •  ` 
    else return tag
  }

  const allCategories = categories.map((category, index) => {
    return <p key={category.id}>{formatCategoriesText(category.tag, index)}</p>
  })


  return (
    <div className="need-container">
      <div className="need-info">
        <h4>{title}</h4>
        <p className="bold">Details:</p>
        <p>{description}</p>
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
        <p className="bold">Contact:</p>
        <p>{pointOfContact}</p>
      </div>
      <div className="button-container">
        <a href={`mailto:${pointOfContact}?subject=${title}`}><button className="volunteer-button">Volunteer</button></a>
      </div>
    </div>
   );
}

export default Need;
