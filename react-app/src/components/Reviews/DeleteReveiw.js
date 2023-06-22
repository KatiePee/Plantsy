import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from "../../store/reviews";
import { singleProductsThunk } from "../../store/products";


const DeleteReviewModal = ({ review }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = (e) => {
    e.preventDefault();
    return dispatch(deleteReviewThunk(review.id))
      .then(() => dispatch(singleProductsThunk(review.productId)))
      .then(closeModal)
  }
  return (
    <div>
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to delete this review?</p>
      <button onClick={handleDelete}>Yes, delete review</button>
      <button onClick={closeModal}>No, keep review</button>
    </div>
  );
}

export default DeleteReviewModal