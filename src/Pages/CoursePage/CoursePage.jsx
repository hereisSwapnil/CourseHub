import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import { CourseDetail } from "../../components/CourseDetail/CourseDetail";

export const CoursePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    window.location.href = "/";
  }
  return (
    <>
      <Navbar />
      <CourseDetail />
      <Footer />
    </>
  );
};
