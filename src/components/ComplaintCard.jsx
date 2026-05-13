import React from 'react';
import StatusBadge from './StatusBadge';
import { MapPin, Image, Trash2 } from 'lucide-react';

/**
 * ComplaintCard
 */
export default function ComplaintCard({
  id,
  title,
  description,
  category,
  status,
  imageUrl,
  date,
  onView,
  onDelete,
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-shadow p-4 flex flex-col md:flex-row">
      
      {/* Image */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="w-full md:w-48 h-32 object-cover rounded-lg mb-4 md:mb-0 md:mr-4"
        />
      ) : (
        <div className="w-full md:w-48 h-32 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 md:mb-0 md:mr-4">
          <Image className="w-8 h-8 text-gray-400" />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {title}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
            {description}
          </p>

          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{category}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-3 flex items-center justify-between">
          <StatusBadge status={status} />

          <div className="flex items-center gap-4">
            
            <button
              onClick={() => onView && onView(id)}
              className="text-primary-600 hover:underline text-sm font-medium"
            >
              View Details
            </button>

            <button
              onClick={() => onDelete && onDelete(id)}
              className="text-red-500 hover:text-red-700 transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>

          </div>
        </div>

        <span className="text-xs text-gray-400 mt-2 self-end">
          {date ? new Date(date).toLocaleDateString() : "No Date"}
        </span>

      </div>
    </div>
  );
}