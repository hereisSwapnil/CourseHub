import React from "react";
import LikeButton from "../LikeButton/LikeButton";

export const CourseCard = ({ course, studentDashboard }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  return (
    <>
      <article key={course.id} className="flex flex-col dark:bg-gray-900">
        <a
          rel="noopener noreferrer"
          href={`/courses/${course.id}`}
          aria-label="Te nulla oportere reprimique his dolorum"
        >
          <img
            alt=""
            className="object-cover w-full h-52 dark:bg-gray-500"
            src={course.thumbnail}
          />
        </a>
        <div className="flex flex-col flex-1 p-6">
          <a
            rel="noopener noreferrer"
            href={`course/${course.id}`}
            aria-label="Te nulla oportere reprimique his dolorum"
          ></a>
          <span
            rel="noopener noreferrer"
            className="text-xs tracking-wide uppercase hover:underline dark:text-violet-400"
          >
            {course.instructor}
          </span>
          <h3 className="flex py-2 text-lg font-semibold leading">
            {course.name}
          </h3>
          <h3 className="flex-1 py-2 text-md leading">{course.description}</h3>
          <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-400">
            {user && user ? (
              <LikeButton courseId={course.id} userId={user.uid} />
            ) : (
              <LikeButton />
            )}

            <div className="flex flex-col gap-4">
              <span>{course.duration}</span>
              <span>{course.location}</span>
            </div>
          </div>
          {studentDashboard ? (
            <div className="flex flex-wrap mb-2 justify-between pt-3 space-x-2 text-xs dark:text-gray-400">
              <span>{course.progress}% completed</span>
            </div>
          ) : (
            ""
          )}
          {studentDashboard ? (
            <div className="w-full h-2 bg-blue-200 rounded-full">
              <div
                className={`h-full text-center text-xs text-white bg-blue-600 rounded-full`}
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          ) : (
            ""
          )}
        </div>
      </article>
    </>
  );
};
