import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import { CourseDetail } from "../../components/CourseDetail/CourseDetail";
import { toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const CoursePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
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
  return (
    <>
      <Navbar />
      <CourseDetail />
      <Footer />
    </>
  );
};
