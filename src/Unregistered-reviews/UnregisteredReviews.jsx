import React, { useEffect, useState } from "react";
import Review from "./UnReview";
import "./UnReviewsPage.css";
import { useReviewStore } from "../hooks/use-review-store";
import { getAllReviewsRequest } from "../lib/api/review";

// const allReviewsData = [
//   {
//     id: 1,
//     value: 5,
//     feedback: "very useful website",
//     date: "2024-06-29T14:12:47.518+00:00",
//     userId: 6,
//     userName: "testuser6",
//     adminId: null,
//     adminName: null,
//   },
//   {
//     id: 2,
//     value: 4,
//     feedback: "very helpful website",
//     date: "2024-06-29T14:14:18.326+00:00",
//     userId: 3,
//     userName: "testuser3",
//     adminId: null,
//     adminName: null,
//   },
//   {
//     id: 3,
//     value: 0,
//     feedback: "bad service",
//     date: "2024-06-29T14:14:34.618+00:00",
//     userId: 2,
//     userName: "ahmed",
//     adminId: null,
//     adminName: null,
//   },
//   // Add more reviews as needed
// ];

const UnregisteredReviews = () => {
  const { reviews, setReviews } = useReviewStore();
  const [visibleReviews, setVisibleReviews] = useState(4);
  // const [isAddingReview, setIsAddingReview] = useState(false);
  // const [newReviewText, setNewReviewText] = useState('');
  // const [newReviewRating, setNewReviewRating] = useState(0);
  // const [newReviewUser, setNewReviewUser] = useState('');
  // const [reviews, setReviews] = useState(allReviewsData);
  // const [likedReviews, setLikedReviews] = useState([]);

  const handleSeeMore = () => {
    setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 4);
  };

  // const handleLike = (reviewId) => {
  //     if (likedReviews.includes(reviewId)) {
  //         setReviews(reviews.map(review =>
  //             review.id === reviewId ? { ...review, likes: (review.likes || 0) - 1 } : review
  //         ));
  //         setLikedReviews(likedReviews.filter(id => id !== reviewId));
  //     } else {
  //         setReviews(reviews.map(review =>
  //             review.id === reviewId ? { ...review, likes: (review.likes || 0) + 1 } : review
  //         ));
  //         setLikedReviews([...likedReviews, reviewId]);
  //     }
  // };

  useEffect(() => {
    const fetchReviews = async () => {
      const fetchedReviews = await getAllReviewsRequest();

      setReviews(fetchedReviews);
    };

    fetchReviews();
  }, []);
  return (
    <div className="page-container">
      <div className="header-container">
        <h1>What Our Happy Users Say!</h1>
        <p>
          <b>Sign up to be able to see more features of our GlucoGuide App.</b>
        </p>
      </div>
      <div className="reviews-container">
        {reviews?.slice(0, visibleReviews).map((data) => (
          <Review
            key={data.id}
            review={data.feedback}
            user={data.userName || data.adminName}
            initialRating={data.value}
            reviewId={data.id}
            likes={data.likes || 0}
            // handleLike={handleLike}
            // likedReviews={likedReviews}
          />
        ))}
        {visibleReviews < reviews?.length && (
          <div className="see-more-container">
            <button className="see-more-button" onClick={handleSeeMore}>
              See More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M12 16.5l6-6-1.41-1.42L12 13.67l-4.59-4.59L6 10.5z" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnregisteredReviews;
