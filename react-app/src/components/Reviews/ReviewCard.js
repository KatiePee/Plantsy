import { useSelector } from "react-redux"
import OpenModalButton from "../OpenModalButton"
import EditReviewModal from "./EditReviewModal"
import DeleteReviewModal from "./DeleteReveiw"

const ReviewCard = ({ review }) => {
  const user = useSelector(state => state.session.user)
  console.log('👺~~~👺~~~👺~~~👺~~~👺~~~👺~~~ review card review', review)
  console.log('👾~~👾~~👾~~👾~~~ review card user id == review ')
  return (
    <div className="product-detail__reviews">
      <p className="review__stars"> {review.review} </p>
      <p className="review__review"> {review.stars} stars </p>
      {user && user.id == review.userId && (
        <OpenModalButton
          buttonText="delete"
          // onItemClick={closeMenu}
          modalComponent={<DeleteReviewModal review={review} />}
        />
      )}
      {user && user.id == review.userId && (
        <OpenModalButton
          buttonText="Edit Review"
          // onItemClick={closeMenu}
          modalComponent={<EditReviewModal prop={review} />}
        />
      )}
    </div>
  )
}

export default ReviewCard