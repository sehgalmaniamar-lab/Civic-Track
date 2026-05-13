import React, {
  useState,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  loginUser,
} from "../services/complaintService";

export default function Login() {

  const navigate =
    useNavigate();

  const [formData,
    setFormData] =
      useState({
        phone_number: "",
        password: "",
      });

  const [loading,
    setLoading] =
      useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {
        setLoading(true);

        const data =
          await loginUser({
            phone_number:
              formData.phone_number,

            password:
              formData.password,
          });

        // Save tokens
        localStorage.setItem(
          "accessToken",
          data.access
        );

        localStorage.setItem(
          "refreshToken",
          data.refresh
        );

        alert(
          "Login successful!"
        );

        navigate("/dashboard");

      } catch (error) {
        console.error(error);

        alert(
          "Invalid credentials"
        );

      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">

        <h1 className="text-3xl font-bold text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Login to continue
        </p>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-6"
        >

          {/* Phone */}
          <div>

            <label className="block text-sm font-medium mb-2">
              Phone Number
            </label>

            <input
              type="text"
              name="phone_number"
              value={
                formData.phone_number
              }
              onChange={
                handleChange
              }
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="9876543210"
            />

          </div>

          {/* Password */}
          <div>

            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={
                formData.password
              }
              onChange={
                handleChange
              }
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="••••••••"
            />

          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-700 transition"
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </button>

        </form>

        <p className="text-sm text-center text-gray-500 mt-6">

          Don’t have an account?{" "}

          <Link
            to="/signup"
            className="text-primary-600 font-medium hover:underline"
          >
            Sign Up
          </Link>

        </p>
      </div>
    </div>
  );
}