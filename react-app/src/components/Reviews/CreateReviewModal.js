import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createReviewThunk } from "../../store/reviews";
import { singleProductsThunk } from "../../store/products";
import MyStarRating from "../helpers/MyStarRating";

export default function CreateReviewModal({ props: { product, user } }) {
  const history = useHistory();
  const { closeModal } = useModal();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [activeStars, setActiveStars] = useState(null);
  const [errors, setErrors] = useState(false);
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();

  let disable = false;
  review.length > 9 || (disable = true);
  stars || (disable = true);

  let formErrors = {};

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = dispatch(
      createReviewThunk({ review, stars }, product.id)
    );
    newReview.errors
      ? setErrors(newReview.errors)
      : newReview
          .then(() => dispatch(singleProductsThunk(product.id)))
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
