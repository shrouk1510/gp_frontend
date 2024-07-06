import React, { useState } from "react";
import "./ReviewsPage1.css";

const Review = ({
  review,
  user,
  initialRating,
  reviewId,
  handleEditReview,
  handleEditRating,
  handleDeleteReview,
  handleLikeReview,
  currentUser,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedReviewText, setEditedReviewText] = useState(review);
  const [rating, setRating] = useState(initialRating);
  const [liked, setLiked] = useState(false);

  const handleRatingClick = (newRating) => {
    if (isMyReview) {
      setRating(newRating);
      handleEditRating(reviewId, { feedback: review, value: newRating });
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveEditClick = () => {
    handleEditReview(reviewId, { feedback: editedReviewText, value: rating });
    setIsEditing(false);
  };

  const handleLikeClick = () => {
    setLiked(!liked);
    handleLikeReview(reviewId);
  };

  const renderRatingStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          style={{ cursor: isMyReview ? "pointer" : "default" }}
          className={i <= rating ? "active" : ""}
          onClick={() => handleRatingClick(i)}
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    }
    return stars;
  };

  const isMyReview = currentUser?.username === user;

  return (
    <div className="Ureview">
      <p>
        <strong>{user}:</strong>
        {isEditing ? (
          <textarea
            className="edit-review-textarea"
            value={editedReviewText}
            onChange={(e) => setEditedReviewText(e.target.value)}
          ></textarea>
        ) : (
          <span>{review}</span>
        )}
        <span className="rating">{renderRatingStars()}</span>
      </p>
      <div className="review-actions">
        {isMyReview ? (
          isEditing ? (
            <button className="saved" onClick={handleSaveEditClick}>
              Save
            </button>
          ) : (
            <>
              <button className="hedit" onClick={handleEditClick}>
                Edit
              </button>
              <button
                className="hdelete"
                onClick={() => handleDeleteReview(reviewId)}
              >
                Delete
              </button>
            </>
          )
        ) : (
          <button
            className={`like-button ${liked ? "liked" : ""}`}
            onClick={handleLikeClick}
          >
            {liked ? "Liked" : "Like"}
          </button>
        )}
      </div>
    </div>
  );
};
export default Review;
