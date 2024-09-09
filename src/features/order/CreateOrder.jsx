

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";


const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;
  const navigate = useNavigation();
  const formError = useActionData()
  const isSubmiting = navigate.state === "submitting"

  return (
    <div>
      <h2>Ready to order? Lets go!</h2>

      <Form method="POST">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required  className="input"/>
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required  className="input"/>
          </div>
          {formError?.phone && <p>{formError.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input 
            className="input" type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
          className="h-6 w-6 accent-yellow-400  focus:outline-none
                         focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
          // value={withPriority}
          // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <Button disabled={isSubmiting} >{isSubmiting ? 'Placing order...' : 'Order now'}</Button>
        </div>
        <input type="hidden" value={JSON.stringify(cart)} name='cart' />
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const orderCreate = await request.formData()

  const data = Object.fromEntries(orderCreate)


  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on"
  }
  const error = {}
  if (!isValidPhone(order.phone)) error.phone = 'pls give as your correct phone number we might need it to contact to you'
  if (Object.keys(error).length > 0) return error
  console.log(error)
  const newOrder = await createOrder(order)

  return redirect(`/order/${newOrder.id}`)
}
export default CreateOrder;
