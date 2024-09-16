import { useSelector } from "react-redux"

function UserName() {

    const name = useSelector(user => user.user.userName)
    if(!name) return null
    return (
        <div className="text-sm font-semibold hidden md:block">
          {name}
        </div>
    )
}

export default UserName
