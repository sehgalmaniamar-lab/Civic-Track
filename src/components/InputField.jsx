import React from 'react';
import PropTypes from 'prop-types';

/**
 * InputField – styled text input with label.
 * Props:
 *   label: string (optional)
 *   id: string – used for label htmlFor and input id
 *   type: string – e.g., "text", "email", "password"
 *   placeholder: string
 *   value, onChange – controlled input props
 *   required: boolean
 */
export default function InputField({ label, id, type = 'text', placeholder = '', value, onChange, required = false }) {
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
      />
    </div>
  );
}

InputField.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};
