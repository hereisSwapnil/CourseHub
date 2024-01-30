// importing react
import React from "react";
// importing components
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import CourseListing from "../../components/CourseListing/CourseListing";

// creating and exporting home component
export const Home = () => {
  return (
    <>
      <Navbar home={true} />
      <CourseListing />
      <Footer />
    </>
  );
};
