import CartOverview from "../features/cart/CartOverview"
import Header from "./Header"
import Loader from "./Loader"
import { Outlet, useNavigation } from "react-router-dom"
function AppLayout() {
    const navigation = useNavigation()

    const isLoading = navigation.state === 'loading'
    return (
        <div className="layout">
            {isLoading && <Loader />}
            <Header />
            <main style={{ border: "2px solid red" }}>

                <Outlet />
            </main>
            <CartOverview />
        </div>
    )
}

export default AppLayout
