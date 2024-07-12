import CartOverview from "../features/cart/CartOverview"
import Header from "./Header"
import Loader from "./Loader"
import { Outlet, useNavigation } from "react-router-dom"
function AppLayout() {
    const navigation = useNavigation()

    const isLoading = navigation.state === 'loading'
    return (
        <div className="grid  h-screen grid-rows-[auto_1fr_auto] ">
            {isLoading && <Loader />}
            <Header />
            <div className="overflow-scroll">
                <main className="overflow-scroll max-w-3xl mx-auto">
                    <Outlet />
                </main>
            </div>
            <CartOverview />
        </div>
    )
}

export default AppLayout
