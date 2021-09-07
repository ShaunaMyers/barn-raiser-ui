const Admin = () => {
    return ( 
        <section>
            <p>View Supporters By Category:</p>
            <form>
                <input type="checkbox" id="organizingCheck"/>
                <label htmlFor="organizingCheck">Organizing / Event Management</label>
                <input type="checkbox" id="handiworkCheck"/>
                <label htmlFor="handiworkCheck">Handiwork</label>
                <input type="checkbox" id="deliveryCheck"/>
                <label htmlFor="deliveryCheck">Delivery</label>
                <input type="checkbox" id="transportationCheck"/>
                <label htmlFor="transportationCheck">Transportation</label>
                <input type="checkbox" id="foodPrepCheck"/>
                <label htmlFor="foodPrepCheck">Food Prep</label>
                <input type="checkbox" id="otherCheck"/>
                <label htmlFor="otherCheck">Other</label>
                <button>View</button>
            </form>
        </section>
     );
}
 
export default Admin;