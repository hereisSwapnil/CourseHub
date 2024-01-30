// importing react
import React from "react";
// importing components
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import { CourseDetail } from "../../components/CourseDetail/CourseDetail";
// importing toastify
import { toast, Bounce } from "react-toastify";
// importing react-router-dom
import { useNavigate } from "react-router-dom";

// creatingand exporting CoursePage
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
