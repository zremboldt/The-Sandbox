import "./App.css";
import { AppHeader } from "./components/app-header";
import { BillingToggle } from "./components/billing-toggle";
import data from "./assets/quote-data.json";
import { PriceCard } from "./components/price-card";

function App() {
  return (
    <>
      <AppHeader />
      <main className="app-main">
        <div className="title-container">
          <h1>Pick the plan that’s right for you.</h1>
          <BillingToggle />
        </div>
        <div className="cards-container">
          {data.map((plan) => (
            <PriceCard key={plan.id} plan={plan} />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
