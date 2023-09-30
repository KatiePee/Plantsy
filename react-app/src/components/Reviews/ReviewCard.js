import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import EditReviewModal from "./EditReviewModal";
import DeleteReviewModal from "./DeleteReveiw";
import StarRatings from "react-star-ratings";
import { useModal } from "../../context/Modal";
import MyStarRating from "../helpers/MyStarRating";

import "./Reviews.css";

const ReviewCard = ({ review }) => {
  const user = useSelector((state) => state.session.user);
  const { setModalContent, setOnModalClose } = useModal();
  return (
    <div className="product-detail__reviews">
      <p>{review.user.firstName}</p>
      <span>{review.createdAt}</span>
      <p className="review__stars"> {review.review} </p>
      <div className="review__stars">
        <MyStarRating
          stars={review.stars}
          canChange={false}
          />{" "}
      </div>
       
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
            onClick={() => setModalContent(<EditReviewModal prop={review} />)}
          >
            <i class="fa-regular fa-pen-to-square"></i>Edit
          </li>
        </ul>
      )}
    </div>
  );
};

export default ReviewCard;
