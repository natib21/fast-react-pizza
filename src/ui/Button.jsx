import { Link } from "react-router-dom";

function Button ({children ,disabled,to , type}){

    const Base= 'focus:outline-none  focus:ring focus:ring-yellow-300 focus:ring-offset-2 bg-yellow-500  uppercase font-semibold text-stone-800  inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-colors duration-300 disabled:cursor-not-allowed ';
    const styles = {
        small:Base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
        primary: Base + ' px-4 py-3  md:px-6 md:py-4' ,
        secondary:'focus:outline-none focus:bg-stone-200 focus:ring focus:ring-stone-300 focus:ring-offset-2 focus:text-stone-800 border-2 border-stone-300  uppercase font-semibold text-stone-400  inline-block tracking-wide rounded-full hover:bg-stone-300 hover:text-stone-800 transition-colors duration-300 disabled:cursor-not-allowed  px-4 py-2.5  md:px-6 md:py-3.5'
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