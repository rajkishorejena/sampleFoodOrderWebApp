import React,{useContext} from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = (props) => {

  const cartCtx = useContext(CartContext);
  
  const totalAmount = cartCtx.totalAmount.toFixed(2);
  const hasItem = cartCtx.items.length >0;
  
  const cardItemRemoveHandler =(id) =>{
      cartCtx.removeItem(id);
  } ;
  const cardItemAddHandler = (item) =>{
      cartCtx.addItem({...item,amount:1});  
  };
  const cartItems = (
    <ul className={classes['cart-items']}>

      {/* {[{ id: 'c1', name: 'Sushi', amount: 2, price: 12.99 }].map((item) => (
        <li>{item.name}</li>
      ))} */}

        {cartCtx.items.map((item) => (
        <CartItem 
        key={item.id}
        name={item.name} 
        price={item.price} 
        amount={item.amount}
        onRemove={cardItemRemoveHandler.bind(null,item.id)}
        onAdd={cardItemAddHandler.bind(null,item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt'] } onClick={props.onClose}>Close</button>
        {hasItem && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;