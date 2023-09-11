import React, { useEffect, useState } from "react";
import Modal from "../UI/Modal";
import OrdersItem from "./OrdersItem";
import classes from "./Orders.module.css";

function Orders(props) {
  const [orders, setOrders] = useState([]);
  const [httpError, setHttpError] = useState("");
  const [reload, setReload] = useState(false);

  const reloadHadler = () => {
    setReload((prev) => !prev);
  };

  useEffect(() => {
    fetch(
      "https://food-order-app-6aa28-default-rtdb.firebaseio.com/orders.json"
    )
      .then((res) => res.json())
      .then((data) => {
        let orderData = [];
        for (let key in data) {
          orderData.push({
            id: key,
            orderedItems: data[key].orderedItems,
            user: data[key].user.name,
          });
        }
        setOrders(orderData.reverse());
      })
      .catch((error) => {
        setHttpError("Something went wrong!");
      });
  }, [reload]);

  return (
    <Modal onClose={props.onClose}>
      {httpError && httpError}
      {orders.length === 0 && !httpError && <p>No Orders Yet!</p>}
      <ul className={classes["order-items"]}>
        {orders.map((order) => (
          <OrdersItem
            key={order.id}
            id={order.id}
            name={order.user}
            items={order.orderedItems}
            onClick={reloadHadler}
          />
        ))}
      </ul>
    </Modal>
  );
}

export default Orders;
