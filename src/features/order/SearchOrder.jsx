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
            />
        </form>
    )
}

export default SearchOrder
