import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utility/helpers";
import { addItem } from "../cart/cartSlice";

function MenuItem(prop) {
  const { id,name, unitPrice, ingredients, soldOut, imageUrl } = prop.pizza;
  const dispatch = useDispatch()
  const handleAddItem= ()=>{
    const newItems = {
      pizzaId:id,
      name,
      quantity:1,
      unitPrice,
      totalPrice : unitPrice * 1
    }

    dispatch(addItem(newItems))
  }

  return (
    <li className="flex gap-4 py-2">
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? 'opacity-70 grayscale':""}`} />
      <div className="flex flex-col grow pt-o.5">
        <p className=" font-medium">{name}</p>
        <p className="text-sm italic text-stone-500 capitalize">{ingredients.join(', ')}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> : <p className="text-sm uppercase font-medium text-stone-500">Sold out</p>}
        {!soldOut && <Button type='small' onClick={handleAddItem}>Add to cart</Button>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
