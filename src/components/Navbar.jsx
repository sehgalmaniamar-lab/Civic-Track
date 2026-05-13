import React from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Menu,
  X,
  Home,
  MapPin,
  ClipboardList,
  BarChart2,
  Settings,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";

export default function Navbar() {

  const [open, setOpen] =
    React.useState(false);

  const navigate =
    useNavigate();

  const token =
    localStorage.getItem(
      "accessToken"
    );

  const handleLogout = () => {

    localStorage.removeItem(
      "accessToken"
    );

    localStorage.removeItem(
      "refreshToken"
    );

    navigate("/login");
  };

  const navLinks = [
    {
      to: "/",
      label: "Home",
      icon: Home,
    },

    {
      to: "/dashboard",
      label: "Dashboard",
      icon: BarChart2,
    },

    {
      to: "/report",
      label: "Report Issue",
      icon: ClipboardList,
    },

    {
      to: "/track",
      label: "Track Complaints",
      icon: MapPin,
    },

    {
      to: "/map",
      label: "Map View",
      icon: MapPin,
    },

    {
      to: "/admin",
      label: "Admin",
      icon: Settings,
    },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">

      <div className="container mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-primary-600"
        >
          CivicTrack
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">

          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center gap-1 text-gray-700 hover:text-primary-600 transition-colors"
            >

              <link.icon className="w-5 h-5" />

              <span>
                {link.label}
              </span>

            </Link>
          ))}

          {/* Auth Buttons */}
          {token ? (

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
            >

              <LogOut className="w-4 h-4" />

              Logout

            </button>

          ) : (

            <div className="flex items-center gap-3">

              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition"
              >

                <LogIn className="w-4 h-4" />

                Login

              </Link>

              <Link
                to="/signup"
                className="flex items-center gap-2 px-4 py-2 border border-primary-600 text-primary-600 rounded-xl hover:bg-primary-50 transition"
              >

                <UserPlus className="w-4 h-4" />

                Sign Up

              </Link>

            </div>

          )}

        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() =>
            setOpen(!open)
          }
        >

          {open ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}

        </button>

      </div>

      {/* Mobile Menu */}
      {open && (

        <div className="md:hidden bg-white shadow-lg border-t">

          <div className="flex flex-col gap-2 px-4 py-4">

            {navLinks.map((link) => (

              <Link
                key={link.to}
                to={link.to}
                onClick={() =>
                  setOpen(false)
                }
                className="flex items-center gap-2 text-gray-700 hover:text-primary-600 py-2"
              >

                <link.icon className="w-5 h-5" />

                <span>
                  {link.label}
                </span>

              </Link>

            ))}

            {/* Mobile Auth */}
            {token ? (

              <button
                onClick={() => {
                  handleLogout();

                  setOpen(false);
                }}
                className="flex items-center justify-center gap-2 mt-4 px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
              >

                <LogOut className="w-4 h-4" />

                Logout

              </button>

            ) : (

              <div className="flex flex-col gap-3 mt-4">

                <Link
                  to="/login"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition"
                >

                  <LogIn className="w-4 h-4" />

                  Login

                </Link>

                <Link
                  to="/signup"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="flex items-center justify-center gap-2 px-4 py-3 border border-primary-600 text-primary-600 rounded-xl hover:bg-primary-50 transition"
                >

                  <UserPlus className="w-4 h-4" />

                  Sign Up

                </Link>

              </div>

            )}

          </div>

        </div>

      )}

    </nav>
  );
}