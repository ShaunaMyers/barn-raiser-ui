import './App.css';
import NeedForm from '../NeedForm/NeedForm';
import NeedList from '../NeedList/NeedList';

function App() {
  return (
    <main>
      <header>
        <h1>BarnRaiser</h1>
      </header>
      <section className="help-questions">
        <h2>Are You Looking for Assistance?</h2>
        <button>I Need Help</button>
        <h3>Can You Offer Assistance?</h3>
        <button>Give Help</button>
        {/* <NeedForm /> */}
      </section>
    </main>
  );
}

export default App;
