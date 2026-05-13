import React from "react";

export default function EmptyState({
  title = "No Data Found",
  description = "Nothing to display right now.",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
      <p className="text-gray-500 mt-2">{description}</p>
    </div>
  );
}