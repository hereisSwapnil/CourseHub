// StudentDashboard.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEnrolledCourses } from "../../actions/courseAction";
import { CourseCard } from "../../components/CourseCard/CourseCard";
import { SkeletonLoaders } from "../../components/SkeletonLoaders/SkeletonLoaders";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import { toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.courses.loading);
  const error = useSelector((state) => state.courses.error);
  const courses = useSelector((state) => state.courses.courses);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const user_ = JSON.parse(localStorage.getItem("user"));
  if (!user_) {
    toast.warning("Please login first!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      onOpen: () => {
        navigate("/");
      },
    });
  }

  useEffect(() => {
    dispatch(fetchEnrolledCourses(user.uid));
  }, [dispatch, user.uid]);

  return (
    <>
      <Navbar />
      <section className="py-6 sm:py-12 dark:bg-gray-800 dark:text-gray-100 min-h-[100vh]">
        <div className="container p-6 mx-auto space-y-8">
          {loading && <SkeletonLoaders />}

          {error && <p>Error: {error}</p>}
          {courses.length == 0 && !loading && !error && (
            <h2 className="mb-1 text-3xl font-semibold my-4">
              You have not enrolled in any courses yet
            </h2>
          )}
          {courses.length != 0 && !loading && !error && (
            <>
              <h2 className="mb-1 text-3xl font-semibold my-4">
                Your enrolled courses
              </h2>
              <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
                {courses.map((course) => (
                  <CourseCard
                    course={course}
                    key={course.id}
                    studentDashboard={true}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default StudentDashboard;
