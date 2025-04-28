import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.quantity * parseFloat(item.cost.substring(1));
    });
    return total.toFixed(2); // 2 decimal places
  };

  const calculateTotalCost = (item) => {
    return (item.quantity * parseFloat(item.cost.substring(1))).toFixed(2);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };

  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert("Functionality to be added for future reference");
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({ name: item.name, quantity: item.quantity - 1 })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div>
          <h2>Your cart is empty.</h2>
          <button onClick={handleContinueShopping} className="cart-button">
            Continue Shopping
          </button>
        </div>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Unit Price: {item.cost}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Subtotal: ${calculateTotalCost(item)}</p>
                <div className="cart-item-controls">
                  <button
                    onClick={() => handleIncrement(item)}
                    className="cart-button"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleDecrement(item)}
                    className="cart-button"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleRemove(item)}
                    className="cart-button-remove"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <h2>Total: ${calculateTotalAmount()}</h2>
            <div className="cart-summary-buttons">
              <button onClick={handleContinueShopping} className="cart-button">
                Continue Shopping
              </button>
              <button
                onClick={handleCheckoutShopping}
                className="cart-button-checkout"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItem;
