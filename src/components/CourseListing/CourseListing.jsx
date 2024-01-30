// CourseListing.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../actions/courseAction";
import { CourseCard } from "../CourseCard/CourseCard";
import { SkeletonLoaders } from "../SkeletonLoaders/SkeletonLoaders";
import { useLocation } from "react-router-dom";

const CourseListing = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);
  const loading = useSelector((state) => state.courses.loading);
  const error = useSelector((state) => state.courses.error);

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const searchTerm = queryParams.get("search");
  console.log(searchTerm);
  useEffect(() => {
    console.log(searchTerm);
    dispatch(fetchCourses(searchTerm));
  }, [dispatch, searchTerm]);

  return (
    <section className="py-6 sm:py-12 dark:bg-gray-800 dark:text-gray-100 min-h-[100vh]">
      <div className="container p-6 mx-auto space-y-8">
        {loading && <SkeletonLoaders />}

        {error && <p>Error: {error}</p>}

        {!loading && !error && courses.length === 0 && <p>No courses found</p>}

        {!loading && !error && courses.length > 0 && (
          <>
            <h2 className="mb-1 text-3xl font-semibold my-4">
              Explore courses
            </h2>
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
              {courses.map((course) => (
                <CourseCard course={course} key={course.id} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CourseListing;
