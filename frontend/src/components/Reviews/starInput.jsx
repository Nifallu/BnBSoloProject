import React, { useState } from 'react';
import StarIcon from './StarIcon';

import './reviews.css'

const StarRatingInput = ({ rating, disabled, onChange }) => {
  const [activeRating, setActiveRating] = useState(rating);

  const handleStarClick = (clickedRating) => {
    if (!disabled) {
      setActiveRating(clickedRating);
      onChange(clickedRating);
    }
  };

  return (
    <div className="rating-input">
      {[1, 2, 3, 4, 5].map((star) => (
        <div
          key={star}
          className={`star ${activeRating >= star ? 'filled' : 'empty'}`}
          onClick={() => handleStarClick(star)}
          onMouseEnter={() => !disabled && setActiveRating(star)}
          onMouseLeave={() => !disabled && setActiveRating(rating)}
        >
          <StarIcon color={activeRating >= star ? 'yellow' : 'gray'} /> {/* my css is over riding this and will need to be fixed */}
        </div>
      ))}
    </div>
  );
};

export default StarRatingInput;
