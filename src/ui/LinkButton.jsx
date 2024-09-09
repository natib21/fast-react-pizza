  import { Link, useNavigate } from "react-router-dom"
  const LinkButton = ({children,to})=>{
      const navigate = useNavigate();
      const className = 'text-sm text-blue-500 hover:underline hover:text-blue-600';
    if( to === '-1'){
        return <button onClick={() => navigate(-1)} className={className}>{children}</button>
    }
    return (
        <Link to={to} className={className}>{children}</Link>
    )
  }
  export default LinkButton