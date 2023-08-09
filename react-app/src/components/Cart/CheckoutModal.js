import { useModal } from "../../context/Modal";

export default function CheckoutModal() {
  const { closeModal } = useModal()

  return (
    <div>
      <h2>Your order has been placed, enjoy!</h2>

      <button onClick={closeModal}>Continue Shopping</button>
    </div>
  )
}