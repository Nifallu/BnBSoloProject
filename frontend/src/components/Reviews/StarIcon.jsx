import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const StarIcon = ({ color }) => {
    return <FontAwesomeIcon icon={faStar} style={{ color: color }} />;
};

export default StarIcon;
