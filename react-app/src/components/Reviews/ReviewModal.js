import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createReviewThunk } from "../../store/reviews";
import { singleProductsThunk } from "../../store/products";
import MyStarRating from "../helpers/MyStarRating";
// role = create
//role = edit
//create = {product, user}
//edit = { review }

export default function ReviewModal({role, product}) {
  const { closeModal } = useModal();
  const [review, setReview] = useState(role?.edit?.review.review || '');
  const [stars, setStars] = useState(role?.edit?.review.stars || 0);
  const [errors, setErrors] = useState(false);
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();

  let disable = false;
  review.length > 9 || (disable = true);
  stars || (disable = true);

  const handleSubmit = (e) => {
  e.preventDefault();

  const newReview = dispatch(createReviewThunk({ review, stars }, product.id));
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
console.log('🍎~~🍎~~🍎~~🍎~~🍎~~~~~~~~~~~~~ role: ', role, role === 'create')
  return (
    <div className="modal-card">
      <h2>{role === "create" ? 'Leave A Review' : 'Edit Your Review'}</h2>
      {errors.review && <p className="errors form__errors">{errors.review}</p>}
      <p>Your Review: </p>
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
       {role === 'create' ? 'Submit Your Review!' : 'Edit Your Review!'}
      </button>
    </div>
  )
}