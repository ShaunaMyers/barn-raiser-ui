import './Admin.css';

const Admin = () => {
    return ( 
        <section>
            <p>View Supporters By Category:</p>
            <form className="Admin-category-form">
                <div className="inputs-labels">
                    <input className="checkboxes" type="checkbox" id="organizingCheck"/>
                    <label htmlFor="organizingCheck">Organizing / Event Management</label>
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
                <button className="view-category-button">View</button>
            </form>
        </section>
     );
}
 
export default Admin;