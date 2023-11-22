import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const [httpError, setHttpError] = useState("");

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const orderHandler = () => {
    setIsCheckout(true);
  };


  // Save the order to the database
  const submitOrderHandler = (userData) => {
    setIsSubmitting(true);
    fetch("https://food-order-app-6aa28-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items,
      }),
    }
    )
      .then((res) => res.json())
      .catch(() => setHttpError("Something went wrong!"));
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  return (
    <Modal onClose={props.onClose}>
      {isSubmitting && <p>Sending order data...</p>}
      {!isSubmitting && didSubmit && !httpError && (<p>Successfully sent the order!</p>)}
      {!isSubmitting && didSubmit && httpError && <p>{httpError}</p>}
      {!isSubmitting && !didSubmit && !httpError && (
        <React.Fragment>
          <ul className={classes["cart-items"]}>
            {cartCtx.items.map((item) => (
              <CartItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={cartCtx.removeItem.bind(null, item.id)}
                onAdd={cartCtx.addItem.bind(null, { ...item, amount: 1 })}
              />
            ))}
          </ul>
          <div className={classes.total}>
            <span>Total Amout</span>
            <span>{totalAmount}</span>
          </div>
          {isCheckout && (<Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />)}
          {!isCheckout && (
            <div className={classes.actions}>
              <button className={classes["button--alt"]} onClick={props.onClose}>Close</button>
              {hasItems && (<button className={classes.button} onClick={orderHandler}>Order</button>)}
            </div>
          )}
        </React.Fragment>
      )}
    </Modal>
  );
};

export default Cart;
