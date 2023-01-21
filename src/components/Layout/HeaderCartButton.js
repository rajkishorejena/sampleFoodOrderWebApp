import React,{useContext,useEffect,useState} from 'react'
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from '../../store/cart-context';


const HeaderCartButton = (props) => {
const cartCtx =  useContext(CartContext);
const [isButtonHighlighted,setIsButtonHighlighted] = useState(false);
const {items} = cartCtx;

//..........check
const numberOfCartItem = items.reduce((curNumber,item)=>{
   return curNumber+item.amount;
},0);

useEffect(()=>{
    
  if(items.length ===0){
    return
  }
  
  setIsButtonHighlighted(true);
   
  const timer = setTimeout(()=>{
   setIsButtonHighlighted(false);
  },300)
    
  return()=>{
    clearTimeout(timer);
  }
},[items])

const btnClasses = `${classes.button} ${isButtonHighlighted ? classes.bump :''}`
  return (
      <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
           <CartIcon/> 
        </span>
        <span>
            Your cart
        </span>
        <span className={classes.badge}>{numberOfCartItem}</span>
      </button>
    )
}

export default HeaderCartButton