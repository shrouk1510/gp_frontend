import React, { useState } from 'react';
import Review from './UnReview';
import './UnReviewsPage.css';

const allReviewsData = [
    { id: 1, user: 'Alice', review: 'This website is amazing!', rating: 0 },
    { id: 2, user: 'Bob', review: 'I found exactly what I needed.', rating: 0 },
    { id: 3, user: 'Charlie', review: 'The user interface could be better.', rating: 0 },
    { id: 4, user: 'Dave', review: 'Great customer support!', rating: 0 },
    { id: 5, user: 'Eve', review: 'Very helpful resources.', rating: 0 },
    { id: 6, user: 'Frank', review: 'User-friendly and efficient.', rating: 0 },
    { id: 7, user: 'Grace', review: 'Love the new features!', rating: 0 },
    { id: 8, user: 'Heidi', review: 'The best app for health tracking.', rating: 0 },
    // Add more reviews as needed
];

const UnregisteredReviews = () => {
    const [visibleReviews, setVisibleReviews] = useState(4);
   // const [isAddingReview, setIsAddingReview] = useState(false);
    const [newReviewText, setNewReviewText] = useState('');
    const [newReviewRating, setNewReviewRating] = useState(0);
    const [newReviewUser, setNewReviewUser] = useState('');
    const [reviews, setReviews] = useState(allReviewsData);
    const [likedReviews, setLikedReviews] = useState([]);

    const handleSeeMore = () => {
        setVisibleReviews(prevVisibleReviews => prevVisibleReviews + 4);
    };

    const handleLike = (reviewId) => {
        if (likedReviews.includes(reviewId)) {
            setReviews(reviews.map(review => 
                review.id === reviewId ? { ...review, likes: (review.likes || 0) - 1 } : review
            ));
            setLikedReviews(likedReviews.filter(id => id !== reviewId));
        } else {
            setReviews(reviews.map(review => 
                review.id === reviewId ? { ...review, likes: (review.likes || 0) + 1 } : review
            ));
            setLikedReviews([...likedReviews, reviewId]);
        }
    };

    return (
        <div className="page-container">
            <div className="header-container">
                <h1>What Our Happy Users Say!</h1>
                <p><b>Sign up to be able to see more features of our GlucoGuide App.</b></p> 

            </div>
            <div className="reviews-container">
                {reviews.slice(0, visibleReviews).map((data, index) => (
                    <Review 
                        key={index} 
                        review={data.review} 
                        user={data.user} 
                        initialRating={data.rating} 
                        reviewId={data.id}
                        likes={data.likes || 0}
                        handleLike={handleLike}
                        likedReviews={likedReviews}
                    />
                ))}
                {visibleReviews < reviews.length && (
                    <div className="see-more-container">
                        <button className="see-more-button" onClick={handleSeeMore}>
                            See More
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
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
