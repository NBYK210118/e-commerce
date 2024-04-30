import { Review } from './Reviews';

export const UsersReviews = ({ reviews = [], reviewList }) => {
  if (reviewList && reviews.length > 0) {
    return (
      <>
        {reviews.map((review, idx) => (
          <Review
            key={idx}
            stars={review.stars}
            nickname={review.user.profile.nickname}
            txt={review.txt}
            profileImg={review.user.profile.imageUrl}
          />
        ))}
      </>
    );
  } else return null;
};
