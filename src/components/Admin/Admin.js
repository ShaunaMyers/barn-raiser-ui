import { useState } from 'react';
// import { useQuery, gql } from '@apollo/client';
import './Admin.css';

// const CATEGORIES_QUERY = gql`{
//     allCategories{
//         id
//         tag
//         supporters {
//             name
//             email
//         }
//     }
//   }`;


const Admin = () => {

    const [organizingChecked, setOrganizingChecked] = useState(false);
    const [handiworkChecked, setHandiworkChecked] = useState(false);
    const [deliveryChecked, setDeliveryChecked] = useState(false);
    const [transportationChecked, setTransportationChecked] = useState(false);
    const [foodPrepChecked, setFoodPrepChecked] = useState(false);
    const [otherChecked, setOtherChecked] = useState(false);

    // const { loading, error, data } = useQuery(CATEGORIES_QUERY);

    // console.log(data, 'data in ADMIN');
    // console.log(error, 'error');

    const handleCheckBoxes = (num) => {
        const checkboxes = ["OrganizingChecked", "HandiworkChecked", "DeliveryChecked", "TransportationChecked", "FoodPrepChecked", "OtherChecked"]
        checkboxes.forEach((checkbox, index) => {
            num === index ? eval(`set${checkbox}(true)`) :
            eval(`set${checkbox}(false)`);
        })
    }

    return ( 
        <section className="admin-section">
            <p className="admin-title">View Volunteers by Category:</p>
            <form className="admin-category-form">
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
            </form>
                <button className="view-category-button">View</button>
        </section>
     );
}
 
export default Admin;