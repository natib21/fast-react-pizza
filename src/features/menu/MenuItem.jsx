import { formatCurrency } from "../../utility/helpers";

function MenuItem(prop) {
  const { name, unitPrice, ingredients, soldOut, imageUrl } = prop.pizza;
  return (
    <li>
      <img src={imageUrl} alt={name} />
      <div>
        <p>{name}</p>
        <p>{ingredients}</p>
        <div>
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
