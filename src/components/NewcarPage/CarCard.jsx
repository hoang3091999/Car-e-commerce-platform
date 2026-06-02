import { StarFilled } from "@ant-design/icons";
import "./carcard.css";
import { useMemo } from "react";

const CarCard = ({ car }) => {
  const rating = useMemo(() => {
    return Math.floor(Math.random() * 5) + 1;
  }, []);
  const comment = useMemo(() => {
    return Math.floor(Math.random() * 100);
  }, []);
  return (
    <div className="car-card">
      <div className="car-image">
        <img src={new URL(`../../assets/images/${car.image}`, import.meta.url).href} alt={car.name} />
      </div>

      <div className="car-content">
        <div className="top-row">
          <span className="new-tag">New</span>
        </div>

        <h3>{car.name}</h3>

        <div className="price">${car.price.toLocaleString()}</div>

        <div className="location">Florida, USA</div>

        <div className="car-info">
          <span>📅 {car.year}</span>
          <span>⚙ {car.brand}</span>
          <span>🔋 {car.fuelType}</span>
        </div>

        <div className="rating">
          {[...Array(rating)].map((_, i) => (
            <StarFilled key={i} className="star" />
          ))}
          <span>({comment})</span>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
