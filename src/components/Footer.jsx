import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-6 mt-8">
      <div className="container mx-auto text-center text-gray-600 dark:text-gray-300">
        <p className="mb-2">© {new Date().getFullYear()} CivicTrack. All rights reserved.</p>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/privacy" className="hover:underline">Privacy</Link>
          <Link to="/terms" className="hover:underline">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
