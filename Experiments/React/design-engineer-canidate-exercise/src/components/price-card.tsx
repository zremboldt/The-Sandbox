import "./price-card.css";
import checkIcon from "../assets/icon-check.svg";
import nullIcon from "../assets/icon-null.svg";
import type { QuoteData } from "../types/quote-data";

export interface PriceCardProps {
  plan: QuoteData;
}

export function PriceCard({ plan }: PriceCardProps) {
  return (
    <article
      key={plan.id}
      className={`price-card ${
        plan.isRecommended ? "price-card--recommended" : ""
      }`}
    >
      <header className="price-card__header">
        <h4 className="plan-title">{plan.name}</h4>
        <p className="plan-tagline">{plan.tagline}</p>
      </header>

      <h2 className="plan-price">{plan.priceDisplay}</h2>

      <section className="plan-section">
        <h5 className="plan-section__title">Policy Coverages</h5>
        <ul className="plan-list">
          {plan.sections.policyCoverages.map((item, i) => (
            <ListItem key={i} item={item} />
          ))}
        </ul>
      </section>

      <section className="plan-section">
        <h5 className="plan-section__title">Vehicle Coverages</h5>
        <ul className="plan-list">
          {plan.sections.vehicleCoverages.map((item, i) => (
            <ListItem key={i} item={item} />
          ))}
        </ul>
      </section>

      <section className="plan-section">
        <h5 className="plan-section__title">Extras</h5>
        <ul className="plan-list">
          {plan.sections.extras.map((item, i) => (
            <ListItem key={i} item={item} />
          ))}
        </ul>
      </section>

      <button className="btn-contained">{plan.ctaText}</button>
    </article>
  );
}

function ListItem({ item }) {
  return (
    <li className="plan-list__item">
      {item.included ? (
        <img src={checkIcon} alt="Included" />
      ) : (
        <img src={nullIcon} alt="Not included" />
      )}
      <span className="plan-list__label">
        {item.label}: {item.value}
      </span>
    </li>
  );
}
