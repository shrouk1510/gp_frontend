import React, { useState, useEffect } from "react";
import Review from "./Review";
import "./ReviewsPage1.css";
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
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [newReviewUser, setNewReviewUser] = useState(activeUser?.username);
  // const [reviews, setReviews] = useState(allReviewsData);
  //   const [currentUser, setCurrentUser] = useState("");

  //   useEffect(() => {
  //     // Fetch the current user from the backend
  //     const getCurrentUser = async () => {
  //       // Replace with actual backend call
  //       const user = "Bob"; // Example user
  //       setCurrentUser(user);
  //     };
  //     getCurrentUser();
  //   }, []);

  const handleSeeMore = () => {
    setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 4);
  };

  const handleSeeLess = () => {
    setVisibleReviews(4); // Reset to initial number of visible reviews
    setShowAllReviews(false); // Toggle to show fewer reviews
  };

  const handleNewReviewTextChange = (e) => {
    setNewReviewText(e.target.value);
  };

  const handleNewReviewUserChange = (e) => {
    setNewReviewUser(e.target.value);
  };

  const handleNewReviewRatingClick = (rating) => {
    setNewReviewRating(rating);
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
        // setNewReviewUser("");
        toast.success("Review added");
      } catch (error) {
        typeof error === "string" ? toast.error(error) : alert(error);
      } finally {
        setIsAddingReview(false);
      }
    }
  };

  const handleEditReview = async (reviewId, values) => {
    try {
      await updateReviewRequest(values, reviewId, role);

      setReviews(
        reviews.map((review) =>
          review.id === reviewId ? { ...review, review: newReviewText } : review
        )
      );

      toast.success("Review updated");
    } catch (error) {
      typeof error === "string" ? toast.error(error) : alert(error);
    }
  };

  const handleEditRating = async (reviewId, values) => {
    try {
      await updateReviewRequest(values, reviewId, role);

      setReviews(
        reviews.map((review) =>
          review.id === reviewId
            ? { ...review, rating: values.newRating }
            : review
        )
      );

      toast.success("Review updated");
    } catch (error) {
      typeof error === "string" ? toast.error(error) : alert(error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReviewRequest(reviewId, role);

      removeReview(reviewId);

      toast.success("Review deleted");
    } catch (error) {
      typeof error === "string" ? toast.error(error) : alert(error);
    }
    // setReviews(reviews.filter((review) => review.id !== reviewId));
  };

  const handleLikeReview = (reviewId) => {
    setReviews(
      reviews.map((review) =>
        review.id === reviewId ? { ...review, liked: !review.liked } : review
      )
    );
  };

  const renderNewReviewStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={i <= newReviewRating ? "active" : ""}
          onClick={() => handleNewReviewRatingClick(i)}
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    }
    return stars;
  };

  useEffect(() => {
    const fetchReviews = async () => {
      const fetchedReviews = await getAllReviewsRequest();

      setReviews(fetchedReviews);
    };

    fetchReviews();
  }, []);

  return (
    <div className="pages-container">
      <div className="header-container">
        <h1>What Our Happy Users Say!</h1>
        <p>
          <b>Sign up to be able to see more features of our GlucoGuide App.</b>
        </p>
        {activeUser && (
          <button
            className="plus-button"
            onClick={() => setIsAddingReview(!isAddingReview)}
          >
            +
          </button>
        )}
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
            <div className="rating">{renderNewReviewStars()}</div>
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
            handleEditReview={handleEditReview}
            handleEditRating={handleEditRating}
            handleDeleteReview={handleDeleteReview}
            handleLikeReview={handleLikeReview}
            currentUser={activeUser}
          />
        ))}
        {visibleReviews < reviews?.length && (
          <div className="seee-more-container">
            {showAllReviews ? (
              <button className="seee-less" onClick={handleSeeLess}>
                See Less
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="M12 16.5l6-6-1.41-1.42L12 13.67l-4.59-4.59L6 10.5z" />
                </svg>
              </button>
            ) : (
              <button className="seee-more-button" onClick={handleSeeMore}>
                See More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="M12 16.5l6-6-1.41-1.42L12 13.67l-4.59-4.59L6 10.5z" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;
