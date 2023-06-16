const ReviewCard = ({ review }) => {
  console.log('👺~~~👺~~~👺~~~👺~~~👺~~~👺~~~ review card review', review)

  return (
    <div className="product-detail__reviews">
      <p className="review__stars"> {review.review} </p>
      <p className="review__review"> {review.stars} stars </p>
    </div>
  )
}

export default ReviewCard