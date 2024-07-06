import React, { useState } from 'react';
import './UnReviewsPage.css';

const UnReview = ({ review, user, initialRating, reviewId, likes, handleLike, likedReviews }) => {
    const [replyText, setReplyText] = useState('');
    const [replies, setReplies] = useState([]);
    const [isReplying, setIsReplying] = useState(false);
    const [rating, setRating] = useState(initialRating);

    const isLiked = likedReviews.includes(reviewId);

    const handleReplyChange = (e) => {
        setReplyText(e.target.value);
    };

    const handleReplySubmit = () => {
        if (replyText.trim()) {
            setReplies([...replies, replyText]);
            setReplyText('');
            setIsReplying(false); // Hide the reply input after submitting
        }
    };

    const renderRatingStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className={i <= rating ? "active" : ""}
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
                <strong>{user}:</strong> {review}
                <span className="rating">{renderRatingStars()}</span>
            </p>
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
            <button className="ss" onClick={() => setIsReplying(!isReplying)}>Reply</button>
            {isReplying && (
                <div className="reply-input">
                    <textarea value={replyText} onChange={handleReplyChange}></textarea>
                    <button className="hhh" onClick={handleReplySubmit}>Submit Reply</button>
                </div>
            )}
            {replies.length > 0 && (
                <div className="replies">
                    <h4>Replies:</h4>
                    {replies.map((rep, index) => (
                        <p key={index} style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{rep}</p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UnReview;
