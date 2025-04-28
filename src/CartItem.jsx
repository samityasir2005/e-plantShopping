import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, updateQuantity } from "./CartSlice";
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

  // Increment quantity using updateQuantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrement quantity or remove item if quantity is 1
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({ name: item.name, quantity: item.quantity - 1 })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Remove item from cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Add one more of the same item (using addItem)
  const handleAddOneMore = (item) => {
    dispatch(addItem(item));
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div className="cart-item" key={item.name}>
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Unit Price: {item.cost}</p>
                <p>
                  Quantity:
                  <button
                    className="cart-item-button"
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </button>
                  {item.quantity}
                  <button
                    className="cart-item-button"
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                  <button
                    className="cart-item-button"
                    onClick={() => handleAddOneMore(item)}
                  >
                    Add One More
                  </button>
                </p>
                <p>Subtotal: ${calculateTotalCost(item)}</p>
                <button
                  className="cart-item-delete"
                  onClick={() => handleRemove(item)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <h3 className="cart-item-total">
              Total: ${calculateTotalAmount()}
            </h3>
            <button
              className="cart-item-button"
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </button>
            <button
              className="cart-item-button"
              onClick={handleCheckoutShopping}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItem;
