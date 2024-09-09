import { Link } from "react-router-dom";

function Button ({children ,disabled,to , type}){

    const Base= 'focus:outline-none  focus:ring focus:ring-yellow-300 focus:ring-offset-2 bg-yellow-500  uppercase font-semibold text-stone-800  inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-colors duration-300 disabled:cursor-not-allowed ';
    const styles = {
        small:Base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
        primary: Base + ' px-4 py-3  md:px-6 md:py-4' 
    }
   
    if(to){
        return <Link className={styles[type]} to={to} >{children}</Link>
    }
    return (
     <button disabled={disabled} className={styles[type]}>
        {children}
     </button>
    );
}
export default Button;