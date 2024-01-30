// LikeButton.js
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Heart from "react-heart";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

const LikeButton = ({ courseId, userId }) => {
  const dispatch = useDispatch();
  const [isUserLiked, setIsUserLiked] = useState(false);

  const checkUserLiked = async (courseId, userId) => {
    const courseRef = collection(firestore, "courses");
    const q = query(courseRef, where("id", "==", courseId));
    const courseSnapshot = await getDocs(q);

    courseSnapshot.forEach(async (courseDoc) => {
      const courseData = courseDoc.data();

      // Ensure likedBy is an array or initialize it as an empty array
      const likedByArray = Array.isArray(courseData.likedBy)
        ? courseData.likedBy
        : [];
      if (likedByArray.includes(userId)) {
        // User has already liked the course
        setIsUserLiked(true);
      } else {
        // User has not liked the course
        setIsUserLiked(false);
      }
    });
  };

  const likeCourse = async () => {
    try {
      // Update Firestore data
      const courseRef = collection(firestore, "courses");
      const q = query(courseRef, where("id", "==", courseId));
      const courseSnapshot = await getDocs(q);

      courseSnapshot.forEach((courseDoc) => {
        const courseData = courseDoc.data();

        // Ensure likedBy is an array or initialize it as an empty array
        const likedByArray = Array.isArray(courseData.likedBy)
          ? courseData.likedBy
          : [];

        const updatedcourseData = {
          ...courseData,
          likes: (courseData.likes || 0) + 1,
          likedBy: [...likedByArray, userId],
        };

        // Update the document in the "courses" collection
        updateDoc(courseDoc.ref, updatedcourseData);
      });
      setIsUserLiked(true);
    } catch (error) {
      console.error("Error liking course:", error);
      // Handle error as needed
    }
  };

  const unlikeCourse = async () => {
    try {
      // Update Firestore data
      const courseRef = collection(firestore, "courses");
      const q = query(courseRef, where("id", "==", courseId));
      const courseSnapshot = await getDocs(q);

      courseSnapshot.forEach((courseDoc) => {
        const courseData = courseDoc.data();

        // Ensure likedBy is an array
        const likedByArray = Array.isArray(courseData.likedBy)
          ? courseData.likedBy
          : [];

        // Update likedBy array and decrement likes
        const updatedcourseData = {
          ...courseData,
          likes: Math.max((courseData.likes || 0) - 1, 0), // Ensure likes is not negative
          likedBy: likedByArray.filter((userId) => userId !== userId), // Remove the user from likedBy
        };

        // Update the document in the "courses" collection
        updateDoc(courseDoc.ref, updatedcourseData);
      });

      setIsUserLiked(false);
    } catch (error) {
      console.error("Error unliking course:", error);
      // Handle error as needed
    }
  };

  useEffect(() => {
    checkUserLiked(courseId, userId);
  }, [dispatch, courseId, userId]);

  return (
    <div style={{ width: "2rem" }}>
      {isUserLiked ? (
        <Heart isActive={true} onClick={unlikeCourse} />
      ) : (
        <Heart isActive={false} onClick={likeCourse} />
      )}
    </div>
  );
};

export default LikeButton;
