import React, { useState } from 'react';
import './ReviewsPage.css';

const Review = ({ review, user, reviewId, initialRating, likes, handleLike, likedReviews, handleDeleteReview }) => {
    const [rating, setRating] = useState(initialRating);
    const isLiked = likedReviews?.includes(reviewId);

    const renderRatingStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <svg
                key={i}
                    // xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className={i <= rating ? "active" : ""}
                    // onClick={() => handleRatingClick(i)}
                >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
            );
        }
        return stars;
    };
 
    return (
        <div className="review">
            <p>
                <strong>{user}:</strong>
                <span>{review}</span>
                <span className="rating">{renderRatingStars()}</span>
            </p>
            <div className="review-actions">
                <button
                    className={`like-button ${isLiked ? 'liked' : ''}`}
                    onClick={() => handleLike(reviewId)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="like-icon"
                    >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    Like
                </button>
                <button className="dd"onClick={() => handleDeleteReview(reviewId)}>Delete</button>
            </div>
        </div>
    );
};

export default Review;
