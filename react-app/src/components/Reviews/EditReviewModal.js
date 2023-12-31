import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { editReviewThunk } from "../../store/reviews";
import { singleProductsThunk } from "../../store/products";
import MyStarRating from "../helpers/MyStarRating";
import "./Reviews.css";

export default function EditReviewModal({ prop }) {
  const { closeModal } = useModal();
  const [review, setReview] = useState(prop.review || '');
  const [stars, setStars] = useState(prop.stars || 0);
  const [errors, setErrors] = useState(false);
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();
  let disable = false;
  review.length > 9 || (disable = true);
  stars || (disable = true);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = dispatch(editReviewThunk({ review, stars }, prop.id));
    newReview.errors
      ? setErrors(newReview.errors)
      : newReview
          .then(() => dispatch(singleProductsThunk(prop.productId)))
          .then(closeModal);

  };

  const handleBlur = () => {
    if (review.length < 10) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };
  return (
    <div className="modal-card">
      <h2>Leave a review</h2>
      {errors.review && <p className="errors form__errors">{errors.review}</p>}

      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Leave your review here...."
        onBlur={handleBlur}
      />
      {showError && (
        <p className="errors form__errors">
          Review must be more than 10 characters.
        </p>
      )}

      <div className="star-container">
        <span> Stars: </span>
          <MyStarRating
          stars={stars}
          setStars={setStars}
          canChange={true}
          />
      </div>

      <button type="submit" onClick={handleSubmit} disabled={disable}>
        Submit Your Review
      </button>
    </div>
  );
}
