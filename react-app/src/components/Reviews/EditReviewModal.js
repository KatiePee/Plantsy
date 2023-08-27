import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { editReviewThunk } from "../../store/reviews";
import { singleProductsThunk } from "../../store/products";
import StarRatings from "react-star-ratings";
import "./Reviews.css";
export default function EditReviewModal({ prop }) {
  const history = useHistory();
  const { closeModal } = useModal();
  const [review, setReview] = useState(prop?.review);
  const [stars, setStars] = useState(prop?.stars);
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

    const newReview = dispatch(editReviewThunk({ review, stars }, prop.id));
    newReview.errors
      ? setErrors(newReview.errors)
      : newReview
          .then(() => dispatch(singleProductsThunk(prop.productId)))
          .then(closeModal);
    // return newReview
    //   .then(() => dispatch(fetchproduct(product.id)))
    //   .then(closeModal)
  };

  const handleBlur = () => {
    if (review.length < 10) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };
  console.log("🎃~~~~~~~stars", stars);
  return (
    <div className="modal-card">
      <h2>Leave a review</h2>
      {errors.review && <p className="errors form__errors">{errors.review}</p>}
      <p>Review:</p>
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
        <StarRatings
          rating={stars}
          starRatedColor="var(--color-salmon)"
          starHoverColor="var(--color-salmon)"
          starSpacing="2px"
          changeRating={(value) => setStars(value)}
          svgIconPath="M63.893,24.277c-0.238-0.711-0.854-1.229-1.595-1.343l-19.674-3.006L33.809,1.15
  C33.479,0.448,32.773,0,31.998,0s-1.48,0.448-1.811,1.15l-8.815,18.778L1.698,22.935c-0.741,0.113-1.356,0.632-1.595,1.343
  c-0.238,0.71-0.059,1.494,0.465,2.031l14.294,14.657L11.484,61.67c-0.124,0.756,0.195,1.517,0.822,1.957
  c0.344,0.243,0.747,0.366,1.151,0.366c0.332,0,0.666-0.084,0.968-0.25l17.572-9.719l17.572,9.719c0.302,0.166,0.636,0.25,0.968,0.25
  c0.404,0,0.808-0.123,1.151-0.366c0.627-0.44,0.946-1.201,0.822-1.957l-3.378-20.704l14.294-14.657
  C63.951,25.771,64.131,24.987,63.893,24.277z"
          svgIconViewBox="0 0 64 64"
          numberOfStars={5}
          starDimension="20px"
          name="rating"
        />
        <span> Stars</span>
      </div>

      <button type="submit" onClick={handleSubmit} disabled={disable}>
        Submit Your Review
      </button>
    </div>
  );
}
