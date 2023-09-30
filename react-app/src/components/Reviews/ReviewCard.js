import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import EditReviewModal from "./EditReviewModal";
import DeleteReviewModal from "./DeleteReveiw";
import StarRatings from "react-star-ratings";
import { useModal } from "../../context/Modal";
import MyStarRating from "../helpers/MyStarRating";
import ReviewModal from "../Reviews/ReviewModal";


import "./Reviews.css";

const ReviewCard = ({ review }) => {
  const user = useSelector((state) => state.session.user);
  const { setModalContent, setOnModalClose } = useModal();
    const _getMonth = (date) => {
    const event = new Date(date);
    const month = event.toLocaleString('default', { month: 'long' });
    const year = event.toLocaleString('default', { year: 'numeric' });
    const day = event.toLocaleString('default', {day: 'numeric'})
    return `${month} ${day}, ${year}`
  }

  return (
    <div className="product-detail__reviews">
      <div className="review__stars">
        <MyStarRating
          stars={review.stars}
          canChange={false}
          />{" "}

        {user && user.id == review.userId && (
          <ul className="review-buttons">
            <li
              onClick={() =>
                setModalContent(<DeleteReviewModal review={review} />)
              }
            >
              <i class="fa-solid fa-trash-can"></i>Delete
            </li>
            <li
              onClick={() => setModalContent(<ReviewModal role={"edit"} prodReview={review} />)}
            >
              <i class="fa-regular fa-pen-to-square"></i>Edit
            </li>
          </ul>
      )}
      
      </div>
      <p className="review__stars"> {review.review} </p>
      <p className="review-name">{review.user.firstName} - <span>{_getMonth(review.createdAt)}</span></p>
      
       
      {/* {user && user.id == review.userId && (
        <ul className="review-buttons">
          <li
            onClick={() =>
              setModalContent(<DeleteReviewModal review={review} />)
            }
          >
            <i class="fa-solid fa-trash-can"></i>Delete
          </li>
          <li
            onClick={() => setModalContent(<ReviewModal role={"edit"} prodReview={review} />)}
          >
            <i class="fa-regular fa-pen-to-square"></i>Edit
          </li>
        </ul>
      )} */}
    </div>
  );
};

export default ReviewCard;
