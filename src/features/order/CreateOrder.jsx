

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";


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
  const name = useSelector(state => state.user.userName);
  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-8 ">Ready to order? Lets go!</h2>

      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input type="text" name="customer" required  className="input flex-1" defaultValue={name}/>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="flex-1">
            <input type="tel" name="phone" required  className="input w-full"/>
            {formError?.phone && <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md">{formError.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="flex-1">
            <input 
            className="input w-full" type="text" name="address" required />
          </div>
        </div>

        <div className="mb-12 flex gap-5 items-center " >
          <input
          className="h-6 w-6 accent-yellow-400  focus:outline-none
                         focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
          // value={withPriority}
          // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">Want to yo give your order priority?</label>
        </div>

        <div>
          <Button type='primary' disabled={isSubmiting} >{isSubmiting ? 'Placing order...' : 'Order now'}</Button>
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
