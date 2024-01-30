import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleCourse } from "../../actions/courseAction";
import { fetchSingleCourseStart } from "../../reducers/courseReducer";
import { SyllabusCard } from "../SyllabusCard/SyllabusCard";
import {
  enrollInCourse,
  unenrollFromCourse,
  markAsComplete,
} from "../../actions/courseAction";
import { toast, Bounce } from "react-toastify";

export const CourseDetail = () => {
  const { courseId } = useParams();
  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const course = useSelector((state) => state.courses.selectedCourse);
  const loading = useSelector((state) => state.courses.loading);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isUserEnrolled, setIsUserEnrolled] = useState(null);
  const [enrollmentLoading, setEnrollmentLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch course details when the component mounts

  const handleMarkAsComplete = async () => {
    // Replace 'userId' and 'courseId' with the actual user and course IDs
    const userId = currentUser.uid;

    await dispatch(markAsComplete(userId, courseId));
    toast.success("Course marked as complete", {
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
    navigate(`/dashboard/${currentUser.uid}`);
  };
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        dispatch(fetchSingleCourseStart());
        await dispatch(fetchSingleCourse(courseId));
      } catch (error) {
        toast.error("Something went wrong", {
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
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourseDetails();
  }, [dispatch, courseId, isUserEnrolled]); // Include isUserEnrolled in the dependency array

  useEffect(() => {
    // Set isUserEnrolled when course and currentUser are available
    setIsUserEnrolled(
      currentUser &&
        course &&
        course.students?.some((student) => student.id === currentUser.uid)
    );
  }, [currentUser, course]);

  const handleEnroll = async () => {
    if (currentUser) {
      try {
        setEnrollmentLoading(true); // Set loading to true when starting the action

        if (isUserEnrolled) {
          await dispatch(
            unenrollFromCourse(courseId, {
              id: currentUser.uid,
            })
          );
          setIsUserEnrolled(false);
          toast.success("You have been unenrolled from the course", {
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
        } else {
          await dispatch(
            enrollInCourse(courseId, {
              email: currentUser.email,
              id: currentUser.uid,
              name: currentUser.displayName,
            })
          );
          setIsUserEnrolled(true);
          toast.success("You have been enrolled in the course", {
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
          navigate(`/dashboard/${currentUser.uid}`);
        }
      } catch (error) {
        toast.error("Something went wrong", {
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
        console.error("Error handling enrollment:", error);
      } finally {
        setEnrollmentLoading(false); // Set loading to false when the action is complete
      }
    } else {
      console.log("User not logged in");
    }
  };

  return (
    <>
      <section className="py-6 sm:py-12 dark:bg-gray-800 dark:text-gray-100 min-h-[100vh]">
        <div className="container p-6 mx-auto space-y-8 gap-10 flex flex-col lg:flex-row">
          {!imageLoaded && !course && loading && (
            <div className="m-auto w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
          )}
          {!loading && !course && <p>Course not found</p>}
          {course && (
            <>
              <img
                src={course.thumbnail}
                alt=""
                onLoad={() => setImageLoaded(true)}
              />
              {!imageLoaded && (
                <div className="m-auto w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
              )}
              {imageLoaded && (
                <div>
                  <h2 className="mb-1 text-3xl font-semibold my-4">
                    {course.name}
                  </h2>
                  <p className="text-lg dark:text-gray-400 my-4">
                    {course.description}
                  </p>
                  <p className="text-lg dark:text-gray-400 my-4">
                    <b>Instructor:</b> {course.instructor}
                  </p>
                  <p className="text-lg dark:text-gray-400 my-4">
                    <b>Duration:</b> {course.duration}
                  </p>
                  <p className="text-lg dark:text-gray-400 my-4">
                    <b>Location:</b> {course.location}
                  </p>
                  <p className="text-lg dark:text-gray-400 my-4">
                    <b>Schedule:</b> {course.schedule}
                  </p>
                  <p className="text-lg dark:text-gray-400 my-4">
                    <b>Enrollment Status:</b> {course.enrollmentStatus}
                  </p>
                  <button
                    type="button"
                    onClick={handleEnroll}
                    className={`px-8 mr-5 py-3 h-15 mt-5 font-semibold rounded  ${
                      isUserEnrolled && isUserEnrolled
                        ? "bg-red-500"
                        : "bg-white text-black"
                    }`}
                  >
                    {enrollmentLoading ? (
                      <div
                        className={`w-6 h-6 border-4 border-dashed rounded-full animate-spin dark:border-violet-400 `}
                      ></div>
                    ) : isUserEnrolled ? (
                      "Unenroll"
                    ) : (
                      "Enroll Now"
                    )}
                  </button>
                  {isUserEnrolled && isUserEnrolled ? (
                    <button
                      type="button"
                      onClick={handleMarkAsComplete}
                      className="px-8 py-3 h-15 mt-5 font-semibold rounded dark:bg-gray-100 dark:text-gray-800"
                    >
                      {enrollmentLoading ? (
                        <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
                      ) : (
                        "Mark as Complete"
                      )}
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </>
          )}
        </div>
        <div className="container p-6 mx-auto space-y-8 gap-10">
          {imageLoaded && (
            <h2 className="mb-1 text-3xl font-semibold my-4">Prerequisites</h2>
          )}
          {imageLoaded &&
            course.prerequisites.map((prerequisite, index) => (
              <p key={index} className="text-lg dark:text-gray-400 my-4">
                {prerequisite}
              </p>
            ))}
        </div>
        <div className="container p-6 mx-auto space-y-8 gap-10">
          {imageLoaded && (
            <h2 className="mb-1 text-3xl font-semibold my-4">Syllabus</h2>
          )}
          {imageLoaded && (
            <>
              {" "}
              <ul className="p-4 lg:p-8 dark:bg-gray-800 dark:text-gray-100">
                {course.syllabus.map((weekData, index) => (
                  <SyllabusCard key={index} weekData={weekData} />
                ))}
              </ul>
              <section className="dark:bg-gray-800 dark:text-gray-100">
                <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
                  <div className="space-y-4"></div>
                </div>
              </section>
            </>
          )}
        </div>
      </section>
    </>
  );
};
