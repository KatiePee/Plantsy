import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteProductThunk } from "../../store/products";


const DeleteProductModal = ({ product }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = (e) => {
    e.preventDefault();
    return dispatch(deleteProductThunk(product.id))
      .then(closeModal)
  }
  return (
    <div>
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to remove this spot from your listings?</p>
      <button onClick={handleDelete}>Yes, delete product</button>
      <button onClick={closeModal}>No, keep product</button>
    </div>
  );
}

export default DeleteProductModal