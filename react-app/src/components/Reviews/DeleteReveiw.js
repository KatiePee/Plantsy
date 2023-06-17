import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from "../../store/reviews";


const DeleteReviewModal = ({ review }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = (e) => {
    e.preventDefault();
    return dispatch(deleteReviewThunk(review.id))
      .then(closeModal)
  }
  return (
    <div>
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to remove this spot from your listings?</p>
      <button onClick={handleDelete}>Yes, delete spot</button>
      <button onClick={closeModal}>No, keep spot</button>
    </div>
  );
}

export default DeleteReviewModal