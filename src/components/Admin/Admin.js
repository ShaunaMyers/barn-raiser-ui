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


    const { loading, error, data } = useQuery(CATEGORIES_QUERY);

    console.log(data, 'data in ADMIN');
    console.log(error, 'error');

    return ( 
        <section className="admin-section">
            <p className="admin-title">View Volunteers by Category:</p>
            <form className="admin-category-form">
                <div className="inputs-labels">
                    <input className="checkboxes" type="checkbox" id="organizingCheck"/>
                    <label htmlFor="organizingCheck">Organizing/Event Management</label>
                </div>
                <div className="inputs-labels">
                    <input className="checkboxes" type="checkbox" id="handiworkCheck"/>
                    <label htmlFor="handiworkCheck">Handiwork</label>
                </div>
                <div className="inputs-labels">
                    <input className="checkboxes" type="checkbox" id="deliveryCheck"/>
                    <label htmlFor="deliveryCheck">Delivery</label>
                </div>
                <div className="inputs-labels">
                    <input className="checkboxes" type="checkbox" id="transportationCheck"/>
                    <label htmlFor="transportationCheck">Transportation</label>
                </div>
                <div className="inputs-labels">
                    <input className="checkboxes" type="checkbox" id="foodPrepCheck"/>
                    <label htmlFor="foodPrepCheck">Food Prep</label>
                </div>
                <div className="inputs-labels">
                    <input className="checkboxes" type="checkbox" id="otherCheck"/>
                    <label htmlFor="otherCheck">Other</label>
                </div>
            </form>
                <button className="view-category-button">View</button>
        </section>
     );
}
 
export default Admin;