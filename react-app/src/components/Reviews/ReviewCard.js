import { useSelector } from "react-redux"
import OpenModalButton from "../OpenModalButton"
import DeleteReviewModal from "./DeleteReveiw"

const ReviewCard = ({ review }) => {
  const user = useSelector(state => state.session.user)
  console.log('👺~~~👺~~~👺~~~👺~~~👺~~~👺~~~ review card review', review)
  console.log('👾~~👾~~👾~~👾~~~ review card user id == review ')
  return (
    <div className="product-detail__reviews">
      <p className="review__stars"> {review.review} </p>
      <p className="review__review"> {review.stars} stars </p>
      {user.id == review.userId && (
        <OpenModalButton
          buttonText="delete"
          // onItemClick={closeMenu}
          modalComponent={<DeleteReviewModal review={review} />}
        />
      )}
    </div>
  )
}

export default ReviewCard