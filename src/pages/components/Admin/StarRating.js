// src/components/StarRating.js

import React from 'react';
import styled from 'styled-components';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

const StarContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StarIcon = styled.div`
  color: ${({ theme }) => theme.colors.primary}; /* Match your theme color */
  margin-right: 2px;
`;

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const totalStars = 5;

  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    if (i <= fullStars) {
      stars.push(<FaStar key={i} />);
    } else if (i === fullStars + 1 && halfStar) {
      stars.push(<FaStarHalfAlt key={i} />);
    } else {
      stars.push(<FaRegStar key={i} />);
    }
  }

  return (
    <StarContainer>
      {stars.map((star, index) => (
        <StarIcon key={index}>{star}</StarIcon>
      ))}
    </StarContainer>
  );
};

export default StarRating;
