import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import CourseListing from "../../components/CourseListing/CourseListing";

export const Home = () => {
  return (
    <>
      <Navbar home={true} />
      <CourseListing />
      <Footer />
    </>
  );
};
