import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, googleAuthProvider } from "../../firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import { logout, login } from "../../reducers/authReducer";
import { toast, Bounce } from "react-toastify";

export const Navbar = ({ home, studentDashboard }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [searchInput, setSearchInput] = useState("");

  const user = useSelector((state) => state.auth.user);

  const handleLogin = async () => {
    try {
      const { user } = await signInWithPopup(auth, googleAuthProvider);
      const user_ = {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
      };
      toast.success("User successfully logged in!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      dispatch(login(user_));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = () => {
    toast.success("User successfully logged out!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    dispatch(logout());
  };

  const navElements = [
    { title: "Home", link: "/", active: home || false, authRequired: false },
    {
      title: "Student Dashboard",
      link: `/dashboard/${isAuthenticated ? user.uid : ""}`,
      active: studentDashboard || false,
      authRequired: true,
    },
  ];

  return (
    <>
      <header className="p-4 dark:bg-gray-800 flex-col flex justify-center align-middle text-center dark:text-gray-100">
        <div className="container flex justify-between h-16 mx-auto">
          <div className="flex justify-center align-middle text-center">
            <a
              rel="noopener noreferrer"
              href="/"
              aria-label="Back to homepage"
              className="flex items-center p-2 font-quattrocento-sans text-2xl"
            >
              CourseHub
            </a>
            <ul className="items-stretch hidden space-x-3 lg:flex">
              {navElements.map((navElement, index) =>
                navElement.authRequired ? (
                  isAuthenticated ? (
                    <li className="flex" key={index}>
                      <a
                        rel="noopener noreferrer"
                        href={navElement.link}
                        className={`flex items-center px-4 -mb-1 border-b-2 dark:border-transparent ${
                          navElement.active &&
                          "dark:text-violet-400 dark:border-violet-400"
                        } font-quattrocento-sans`}
                      >
                        {navElement.title}
                      </a>
                    </li>
                  ) : (
                    ""
                  )
                ) : (
                  <li className="flex" key={index}>
                    <a
                      rel="noopener noreferrer"
                      href={navElement.link}
                      className={`flex items-center px-4 -mb-1 border-b-2 dark:border-transparent ${
                        navElement.active &&
                        "dark:text-violet-400 dark:border-violet-400"
                      } font-quattrocento-sans`}
                    >
                      {navElement.title}
                    </a>
                  </li>
                )
              )}
            </ul>
            {/* First search input visible on larger screens */}
            <input
              className="px-8 ml-5 relative py-3 h-12 border-2 border-gray-300 font-semibold rounded dark:bg-gray-100 dark:text-gray-800 hidden lg:block"
              type="text"
              placeholder="Search courses"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  const searchTerm = e.target.value;
                  window.location.href = `?search=${encodeURIComponent(
                    searchTerm
                  )}`;
                }
              }}
            />
          </div>
          <div className="items-center flex-shrink-0 hidden lg:flex">
            {!isAuthenticated ? (
              <button
                className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900"
                onClick={handleLogin}
              >
                Log in with Google
              </button>
            ) : (
              <button
                className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900"
                onClick={handleLogout}
              >
                Log out
              </button>
            )}
          </div>
          {/* Button for toggling menu on small screens */}
          <button className="p-4 lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 dark:text-gray-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
        {/* Second search input visible on small screens */}
        <input
          className="px-8 ml-5 relative py-3 w-[40vw] h-12 border-2 border-gray-300 font-semibold rounded dark:bg-gray-100 dark:text-gray-800 block lg:hidden"
          type="text"
          style={{ margin: "auto" }}
          placeholder="Search courses"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              const searchTerm = e.target.value;
              window.location.href = `?search=${encodeURIComponent(
                searchTerm
              )}`;
            }
          }}
        />
      </header>
    </>
  );
};
