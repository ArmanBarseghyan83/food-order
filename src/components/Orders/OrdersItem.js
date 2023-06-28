import React, { Fragment, useState } from "react";
import classes from "./Orders.module.css";

function OrdersItem(props) {
  const [httpError, setHttpError] = useState("");

  const calcelHandler = (id) => {
    fetch(
      `https://food-order-app-6aa28-default-rtdb.firebaseio.com/orders/${id}.json`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then(() => props.onClick())
      .catch((error) => {
        setHttpError("Something went wrong!");
      });
  };

  return (
    <Fragment>
      <li className={classes["order-item"]}>
        {httpError && httpError}
        <div className={classes["order-item-header"]}>
          <h2 className={classes.person}>{props.name}</h2>
          <button onClick={calcelHandler.bind(null, props.id)}>Cancel</button>
        </div>
        {props.items.map((item) => {
          return (
            <div className={classes["order-content"]} key={item.id}>
              <div>
                <h3>{item.name}</h3>
                <div className={classes.price}>$ {item.price}</div>
              </div>
              <div className={classes.amount}>X {item.amount}</div>
            </div>
          );
        })}
      </li>
    </Fragment>
  );
}

export default OrdersItem;
