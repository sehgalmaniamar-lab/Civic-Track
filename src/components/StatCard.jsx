import React from "react";

export default function StatCard({ label, value, Icon }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-6 text-center transition transform hover:scale-105">
      {Icon && <Icon className="w-8 h-8 mx-auto text-primary-600 mb-2" aria-hidden="true" />}
      <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{value}</p>
      <p className="text-gray-600 dark:text-gray-300 mt-1">{label}</p>
    </div>
  );
}
