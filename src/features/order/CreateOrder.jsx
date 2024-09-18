

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );
import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from '../../store'
import { formatCurrency } from "../../utility/helpers";
import { fetchAddress } from "../user/userSlice";


function CreateOrder() {
 const [withPriority, setWithPriority] = useState(false);
 const dispatch = useDispatch()
  const cart = useSelector(getCart);
  const navigate = useNavigation();
  const formError = useActionData()
  const isSubmiting = navigate.state === "submitting"
  const {userName,status:addressStatus,position,address,error:errorAddress} = useSelector(state => state.user);
  const isLoadingAddress = addressStatus.state === 'loading'
  const totalCartPrice = useSelector(getTotalCartPrice)
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  if(!cart.length) return <EmptyCart />
  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-8 ">Ready to order? Lets go!</h2>
      
      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input type="text" name="customer" required  className="input flex-1" defaultValue={userName}/>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="flex-1">
            <input type="tel" name="phone" required  className="input w-full"/>
            {formError?.phone && <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md">{formError.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="flex-1 ">
            <input 
            className="input w-full" type="text" name="address" disabled={isLoadingAddress} required defaultValue={address}/>
                {addressStatus === 'error' && <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md">{errorAddress}</p>}
          </div>
        {!position.latitude && !position.longtiude &&  <span className=" absolute right-[3px] z-50 top-[3px] md:right-[5px] md:top-[5px] ">

          <Button 
            type='small' 
             disabled={isLoadingAddress}
            onClick={(e)=>{
              e.preventDefault();
            dispatch(fetchAddress())
            }
            }
            >
              Get Position
            </Button>
          </span>}
        </div>

        <div className="mb-12 flex gap-5 items-center " >
          <input
          className="h-6 w-6 accent-yellow-400  focus:outline-none
                         focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
          value={withPriority}
          onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">Want to yo give your order priority?</label>
        </div>

        <div>
          <Button type='primary' disabled={isSubmiting} >{isSubmiting  || isLoadingAddress ? 'Placing order...' : `Order now from ${formatCurrency(totalPrice)}`}</Button>
        </div>
        <input type="hidden" value={JSON.stringify(cart)} name='cart' />
        <input type="hidden" value={position.longtiude && position.latitude ? `${position.latitude},${position.longtiude}`:''} name='position' />
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
    priority: data.priority === "true"
  }
  console.log(order)
  const error = {}
  if (!isValidPhone(order.phone)) error.phone = 'pls give as your correct phone number we might need it to contact to you'
  if (Object.keys(error).length > 0) return error
  console.log(error)
  const newOrder = await createOrder(order)
  store.dispatch(clearCart())
  return redirect(`/order/${newOrder.id}`)
}
export default CreateOrder;
