import { Fragment } from "react";
import { MdOutlineDeliveryDining } from "react-icons/md";
import HeaderCartButton from "./HeaderCartButton";
import mealsImage from "../../assets/order-food.jpg"; // 'mealsImage' name up to us
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <div onClick={props.onHomeShow}>
          <MdOutlineDeliveryDining className={classes.icon} />
        </div>
        <h3 className={classes.link} onClick={props.onMealsShow}>
          All Meals
        </h3>
        <h3 className={classes.link} onClick={props.onShowOrders}>
          Orders
        </h3>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="food" />
      </div>
    </Fragment>
  );
};

export default Header;
