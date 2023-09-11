import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import Orders from "./components/Orders/Orders";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [ordersIsShown, setOrersIsShown] = useState(false);
  const [showMeals, setShowMeals] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const showOrdersHandler = () => {
    setOrersIsShown(true);
  };

  const hideOrdersHandler = () => {
    setOrersIsShown(false);
  };

  const showMealsHandler = () => {
    setShowMeals(true);
  };

  const showHomeHandler = () => {
    setShowMeals(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      {ordersIsShown && <Orders onClose={hideOrdersHandler} />}
      <Header
        onShowCart={showCartHandler}
        onShowOrders={showOrdersHandler}
        onMealsShow={showMealsHandler}
        onHomeShow={showHomeHandler}
      />
      <main>
        <Meals showMeals={showMeals} />
      </main>
    </CartProvider>
  );
}

export default App;
