import { useModal } from "../../context/Modal";
import "./Cart.css";

export default function CheckoutModal() {
  const { closeModal } = useModal();

  return (
    <div className="checkout-wrapper">
      <h3 className="checkout-header">Your order has been placed, enjoy!</h3>

      <button className="checkout-button" onClick={closeModal}>
        Continue Shopping
      </button>
    </div>
  );
}
