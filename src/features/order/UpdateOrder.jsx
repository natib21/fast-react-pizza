import { useFetcher } from "react-router-dom"
import Button from "../../ui/Button"
import { updateOrder } from "../../services/apiRestaurant";

   const UpdateOrder = ({order})=>{

    const fetcure = useFetcher();

    console.log(order)
    return ( <fetcure.Form method="PATCH" className="text-right">

        <Button type='primary'>Make priority</Button>
    </fetcure.Form>
    )
   }
   export default UpdateOrder

   export async function action ({params}){
    const data = {priority:true};
    await updateOrder(params.orderId,data)
    return null
   }