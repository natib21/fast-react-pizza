import { useState } from "react"
import { useNavigate } from "react-router-dom"

function SearchOrder() {
    const [query, setQuery] = useState('')
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!query) return
        navigate(`/order/${query}`)
        setQuery('')
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text"
                placeholder="Insert Id"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                className="rounded-full 
                        px-4 py-2 text-sm
                         bg-yellow-100
                         placeholder:text-stone-400 
                         sm:w-64 sm:focus:w-72 transition-all duration-300
                         focus:outline-none focus:ring focus:ring-yellow-500 
                         focus:ring-opacity-50"
            />
        </form>
    )
}

export default SearchOrder
