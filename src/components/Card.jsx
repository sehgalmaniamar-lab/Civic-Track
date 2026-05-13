import React from 'react';
import PropTypes from 'prop-types';

/**
 * Generic Card wrapper with subtle shadow and rounded corners.
 * Accepts optional `className` to extend styling.
 */
export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-card p-6 ${className}`}>
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
