import React, { useState, useEffect } from "react";
import Review from "./Review";
import "./ReviewsPage.css";
import { useReviewStore } from "../hooks/use-review-store";
import { useAuthContext } from "../contexts/auth-context";
import toast from "react-hot-toast";
import {
  addReviewRequest,
  deleteReviewRequest,
  getAllReviewsRequest,
  updateReviewRequest,
} from "../lib/api/review";

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

const ReviewsPage = () => {
  const { reviews, setReviews, addReview, removeReview } = useReviewStore();
  const { activeUser, role } = useAuthContext();
  const [visibleReviews, setVisibleReviews] = useState(4);
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [newReviewUser, setNewReviewUser] = useState("");
  //   const [reviews, setReviews] = useState(allReviewsData);
  const [likedReviews, setLikedReviews] = useState([]);

  const handleSeeMore = () => {
    setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 4);
  };

  const handleNewReviewTextChange = (e) => {
    setNewReviewText(e.target.value);
  };

  const handleNewReviewUserChange = (e) => {
    setNewReviewUser(e.target.value);
  };

  const handleNewReviewSubmit = async () => {
    if (newReviewText.trim() && newReviewUser.trim()) {
      try {
        const newReview = await addReviewRequest(
          {
            feedback: newReviewText,
            value: newReviewRating,
          },
          role
        );

        addReview(newReview);

        setNewReviewText("");
        setNewReviewRating(0);
        setNewReviewUser("");
        toast.success("Review added");
      } catch (error) {
        typeof error === "string" ? toast.error(error) : alert(error);
      } finally {
        setIsAddingReview(false);
      }
    }
  };

  const handleLike = (reviewId) => {
    if (likedReviews.includes(reviewId)) {
      setReviews(
        reviews.map((review) =>
          review.id === reviewId
            ? { ...review, likes: (review.likes || 0) - 1 }
            : review
        )
      );
      setLikedReviews(likedReviews.filter((id) => id !== reviewId));
    } else {
      setReviews(
        reviews.map((review) =>
          review.id === reviewId
            ? { ...review, likes: (review.likes || 0) + 1 }
            : review
        )
      );
      setLikedReviews([...likedReviews, reviewId]);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReviewRequest(reviewId);

      removeReview(reviewId);

      toast.success("Review deleted");
    } catch (error) {
      typeof error === "string" ? toast.error(error) : alert(error);
    }
    // setReviews(reviews.filter((review) => review.id !== reviewId));
  };

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
        <button
          className="plus-button"
          onClick={() => setIsAddingReview(!isAddingReview)}
        >
          +
        </button>
        {isAddingReview && (
          <div className="new-review-form">
            <input
              type="text"
              value={newReviewUser}
              onChange={handleNewReviewUserChange}
              placeholder="Your Name"
            ></input>
            <textarea
              value={newReviewText}
              onChange={handleNewReviewTextChange}
              placeholder="Write your own review here..."
            ></textarea>
            <button onClick={handleNewReviewSubmit}>Submit Review</button>
          </div>
        )}
      </div>
      <div className="reviews-container">
        {reviews?.slice(0, visibleReviews).map((review) => (
          <Review
            key={review.id}
            review={review.feedback}
            user={review.userName || review.adminName}
            initialRating={review.value}
            reviewId={review.id}
            likes={review.likes || 0}
            handleLike={handleLike}
            likedReviews={likedReviews}
            handleDeleteReview={handleDeleteReview}
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

export default ReviewsPage;
