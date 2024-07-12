import { Link } from "react-router-dom"
import UserName from "../features/user/UserName"
import SearchOrder from "../features/order/SearchOrder"
function Header() {
    return (
        <div className="flex items-center justify-between bg-yellow-500 
              uppercase px-4 py-4 border-b border-stone-200 sm:px-6">
            <Link to='/' className="tracking-widest">Fast React Pizza Co.</Link>
            <SearchOrder />
            <UserName />
        </div>
    )
}

export default Header
