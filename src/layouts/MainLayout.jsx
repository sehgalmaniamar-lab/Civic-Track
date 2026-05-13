import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
