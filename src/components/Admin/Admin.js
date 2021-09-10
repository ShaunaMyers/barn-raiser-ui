import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import './Admin.css';

const CATEGORIES_QUERY = gql`{
    allCategories{
        id
        tag
        supporters {
            name
            email
        }
    }
  }`;

const Admin = () => {

    const [organizingChecked, setOrganizingChecked] = useState(false);
    const [handiworkChecked, setHandiworkChecked] = useState(false);
    const [deliveryChecked, setDeliveryChecked] = useState(false);
    const [transportationChecked, setTransportationChecked] = useState(false);
    const [foodPrepChecked, setFoodPrepChecked] = useState(false);
    const [otherChecked, setOtherChecked] = useState(false);
    const [categorySupporters, setCategorySupporters] = useState([]);
    const [noSupportersMessage, setNoSupportersMessage] = useState('');

    let categorySelected = 0;

    
    const { loading, error, data } = useQuery(CATEGORIES_QUERY);

    const handleCheckBoxes = (num) => {
        setNoSupportersMessage('');
        const checkboxStrings = ["OrganizingChecked", "HandiworkChecked", "DeliveryChecked", "TransportationChecked", "FoodPrepChecked", "OtherChecked"];
        checkboxStrings.forEach((checkbox, index) => {
            num === index ? eval(`set${checkbox}(true)`) :
            eval(`set${checkbox}(false)`);
        })
    }
    
    const loadCategorySupporters = () => {
        assignCategorySelected()
        const matchingCategory = data.allCategories.find(category => parseInt(category.id) === categorySelected);
        const removeDuplicates = [...new Set(matchingCategory.supporters)]
        const supportersPerCategory = removeDuplicates.map(supporter => {
            return (
            <section key={Math.random()} className="supporter-entry">
                <div className="supporter-details">
                    <p className="supporter-titles">Name: </p>
                    <p>{supporter.name}</p>
                </div>
                <div className="supporter-details">
                    <p className="supporter-titles">E-mail: </p>
                    <p>{supporter.email}</p>
                </div>
            </section>
            )
        })
        supportersPerCategory.length ? setCategorySupporters(supportersPerCategory) :
        setNoSupportersMessage('There are currently no volunteers for this category');
    }

    const assignCategorySelected = () => {
        const checkboxes = [otherChecked, organizingChecked, deliveryChecked, handiworkChecked, transportationChecked, foodPrepChecked];
        checkboxes.forEach((checkbox, index) => {
            if (checkbox) {
                categorySelected = (index + 1);
            }
        })
    }

    if (loading) {
        return(
          <p>Loading...</p>
        )
      } else if (error) {
        return(
          <p>error</p>
        )
      } else {
        return ( 
        <section className="admin-section">
            <p className="admin-title">View Volunteers by Category:</p>
            <form className="admin-category-form">
                <article className="categories-grouped">
                    <div className="inputs-labels">
                        <input onChange={() => handleCheckBoxes(0)} className="checkboxes" type="checkbox" id="organizingCheck" checked={organizingChecked}/>
                        <label htmlFor="organizingCheck">Organizing/Event Management</label>
                    </div>
                    <div className="inputs-labels">
                        <input onChange={() => handleCheckBoxes(1)} className="checkboxes" type="checkbox" id="handiworkCheck" checked={handiworkChecked}/>
                        <label htmlFor="handiworkCheck">Handiwork</label>
                    </div>
                    <div className="inputs-labels">
                        <input onChange={() => handleCheckBoxes(2)} className="checkboxes" type="checkbox" id="deliveryCheck" checked={deliveryChecked}/>
                        <label htmlFor="deliveryCheck">Delivery</label>
                    </div>
                </article>
                <article className="categories-grouped">
                    <div className="inputs-labels">
                        <input onChange={() => handleCheckBoxes(3)} className="checkboxes" type="checkbox" id="transportationCheck" checked={transportationChecked}/>
                        <label htmlFor="transportationCheck">Transportation</label>
                    </div>
                    <div className="inputs-labels">
                        <input onChange={() => handleCheckBoxes(4)} className="checkboxes" type="checkbox" id="foodPrepCheck" checked={foodPrepChecked}/>
                        <label htmlFor="foodPrepCheck">Food Prep</label>
                    </div>
                    <div className="inputs-labels">
                        <input onChange={() => handleCheckBoxes(5)} className="checkboxes" type="checkbox" id="otherCheck" checked={otherChecked}/>
                        <label htmlFor="otherCheck">Other</label>
                    </div>
                </article>
            </form>
            <button onClick={loadCategorySupporters}className="view-category-button">Search</button>
            {!!categorySupporters.length  && !noSupportersMessage.length &&
                <article>
                    {categorySupporters} 
                </article> 
            }
            {!!noSupportersMessage.length && 
                <p className="admin-text">{noSupportersMessage}</p>
            }
            {!noSupportersMessage.length && !categorySupporters.length &&
                <p className="admin-text">Please select a category and search to view volunteers</p>
            }
        </section>
     );
    }
}
 
export default Admin;