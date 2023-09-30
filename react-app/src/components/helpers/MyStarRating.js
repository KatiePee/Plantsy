import StarRatings from "react-star-ratings";

export default function MyStarRating ({stars, setStars, canChange}){
  const svgPath = "M63.893,24.277c-0.238-0.711-0.854-1.229-1.595-1.343l-19.674-3.006L33.809,1.15C33.479,0.448,32.773,0,31.998,0s-1.48,0.448-1.811,1.15l-8.815,18.778L1.698,22.935c-0.741,0.113-1.356,0.632-1.595,1.343c-0.238,0.71-0.059,1.494,0.465,2.031l14.294,14.657L11.484,61.67c-0.124,0.756,0.195,1.517,0.822,1.957c0.344,0.243,0.747,0.366,1.151,0.366c0.332,0,0.666-0.084,0.968-0.25l17.572-9.719l17.572,9.719c0.302,0.166,0.636,0.25,0.968,0.25c0.404,0,0.808-0.123,1.151-0.366c0.627-0.44,0.946-1.201,0.822-1.957l-3.378-20.704l14.294-14.657C63.951,25.771,64.131,24.987,63.893,24.277z"
return canChange ? (
   <StarRatings
          rating={stars}
          starRatedColor="var(--color-salmon)"
          starHoverColor="var(--color-salmon)"
          starSpacing="2px"
          changeRating={(value) => setStars(value)}
          svgIconPath={svgPath}
          svgIconViewBox="0 0 64 64"
          numberOfStars={5}
          starDimension="20px"
          name="rating"
        />
) : (
    <StarRatings
          rating={stars}
          starRatedColor="var(--color-salmon)"
          starSpacing="2px"
          svgIconPath={svgPath}
          svgIconViewBox="0 0 64 64"
          numberOfStars={5}
          starDimension="15px"
          name="rating"
        />
)
}