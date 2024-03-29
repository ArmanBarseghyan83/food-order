import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// Update the state based on the action
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[existingItemIndex];

    // If the item exists update its amount, else add the item to the state
    let updatedItems;
    if (existingItem) {
      existingItem.amount = existingItem.amount + action.item.amount;
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = existingItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    localStorage.setItem('cart', JSON.stringify(updatedItems))
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  // Remove the item from the state
  if (action.type === "REMOVE") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems = [...state.items];
    if (existingItem.amount === 1) {
      updatedItems.splice(existingItemIndex, 1);
    } else {
      updatedItems[existingItemIndex].amount = existingItem.amount - 1;
    }
    localStorage.setItem('cart', JSON.stringify(updatedItems))
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR") {
    return defaultCartState;
  }
  return defaultCartState;
};

// Create the provider and pass the cartContext
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
