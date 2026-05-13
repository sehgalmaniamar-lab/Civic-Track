import React from 'react';

export default function SectionHeading({ title, subtitle }) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-600 dark:text-gray-400 text-lg">{subtitle}</p>
      )}
    </div>
  );
}
