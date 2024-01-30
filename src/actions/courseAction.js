// imports
import {
  fetchCoursesStart,
  fetchCoursesSuccess,
  fetchCoursesFailure,
  fetchSingleCourseStart,
  fetchSingleCourseSuccess,
  fetchSingleCourseFailure,
  setLoading,
  setError,
  setSuccess,
} from "../reducers/courseReducer";
import { firestore } from "../firebase/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  arrayRemove,
  setDoc,
} from "firebase/firestore";

// fetching all courses if searchTerm is null or ""
// else fetching courses that match the searchTerm by (name, instructor)
export const fetchCourses = (searchTerm) => async (dispatch) => {
  try {
    dispatch(fetchCoursesStart());
    const coursesCollection = collection(firestore, "courses");
    let baseQuery = query(coursesCollection);
    const coursesSnapshot = await getDocs(baseQuery);
    const coursesData = [];
    coursesSnapshot.docs.map((doc) => {
      const data = doc.data();
      if (searchTerm === null) {
        coursesData.push(data);
      } else if (
        data.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        coursesData.push(data);
      }
    });
    dispatch(fetchCoursesSuccess(coursesData));
  } catch (error) {
    console.error("Error fetching courses:", error);
    dispatch(fetchCoursesFailure(error.message));
  }
};

// fetching a particular course details using courseId
export const fetchSingleCourse = (courseId) => async (dispatch) => {
  try {
    dispatch(fetchSingleCourseStart());
    const coursesCollection = collection(firestore, "courses");
    const q = query(coursesCollection, where("id", "==", courseId)); // Adjust the field name accordingly
    const coursesSnapshot = await getDocs(q);
    if (coursesSnapshot.docs.length === 0) {
      throw new Error("Course not found");
    }
    const courseData = coursesSnapshot.docs[0].data();
    dispatch(fetchSingleCourseSuccess(courseData));
  } catch (error) {
    dispatch(fetchSingleCourseFailure(error.message));
  }
};

// getting enrolled in a particular course by a particular user using courseId and user
export const enrollInCourse = (courseId, user) => async (dispatch) => {
  try {
    const courseRef = collection(firestore, "courses");
    const q = query(courseRef, where("id", "==", courseId));
    const courseSnapshot = await getDocs(q);
    if (courseSnapshot.empty) {
      throw new Error("Course not found");
    }
    const courseDoc = courseSnapshot.docs[0];
    const courseData = courseDoc.data();
    const enrolledUsers = courseData.students || [];
    const isUserEnrolled = enrolledUsers.some((user_) => user_.id === user.id);
    if (isUserEnrolled) {
      throw new Error("User is already enrolled in this course");
    }
    user.progress = 0;
    const updatedEnrolledUsers = arrayUnion(...enrolledUsers, user);
    await updateDoc(doc(firestore, "courses", courseDoc.id), {
      students: updatedEnrolledUsers,
    });
  } catch (error) {
    console.error("Error enrolling in the course:", error);
  }
};

// getting unenrolled in a particular course by a particular user using courseId and user
export const unenrollFromCourse = (courseId, user) => async (dispatch) => {
  try {
    const courseRef = collection(firestore, "courses");
    const q = query(courseRef, where("id", "==", courseId));
    const courseSnapshot = await getDocs(q);
    if (courseSnapshot.empty) {
      throw new Error("Course not found");
    }
    const courseDoc = courseSnapshot.docs[0];
    const courseData = courseDoc.data();
    const enrolledUsers = courseData.students || [];
    const isUserEnrolled = enrolledUsers.some((user_) => user_.id === user.id);
    if (!isUserEnrolled) {
      throw new Error("User is not enrolled in this course");
    }
    const updatedEnrolledUsers = arrayRemove(
      ...enrolledUsers.filter((u) => u.id === user.id)
    );
    await updateDoc(doc(firestore, "courses", courseDoc.id), {
      students: updatedEnrolledUsers,
    });
  } catch (error) {
    console.error("Error unenrolling from the course:", error);
  }
};

// getting a particular user's enrolled courses by using userId
export const getEnrolledCourses = async (userId, dispatch) => {
  try {
    const coursesRef = collection(firestore, "courses");
    const coursesSnapshot = await getDocs(coursesRef);
    const enrolledCoursesDetails = [];
    coursesSnapshot.forEach((courseDoc) => {
      const courseData = courseDoc.data();
      courseData.students.forEach((student) => {
        if (student.id === userId) {
          console.log(courseData);
          enrolledCoursesDetails.push({
            id: courseData.id,
            name: courseData.name,
            instructor: courseData.instructor,
            description: courseData.description,
            thumbnail: courseData.thumbnail,
            progress: student.progress,
          });
        }
      });
    });
    return enrolledCoursesDetails;
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    throw error;
  }
};

// fetching a particular user's enrolled courses by using userId
export const fetchEnrolledCourses = (userId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const enrolledCourses = await getEnrolledCourses(userId, dispatch);
    dispatch(setSuccess(enrolledCourses));
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    dispatch(setError(error.message));
  }
};

// updating progress of a particular user in a particular course
export const markAsComplete = (userId, courseId) => async (dispatch) => {
  try {
    const courseRef = collection(firestore, "courses");
    const q = query(courseRef, where("id", "==", courseId));
    const courseSnapshot = await getDocs(q);
    if (courseSnapshot.empty) {
      throw new Error("Course not found");
    }
    courseSnapshot.forEach((courseDoc) => {
      const courseData = courseDoc.data();
      const updatedStudents = courseData.students.map((student) => {
        if (student.id === userId) {
          console.log(courseData);
          return {
            ...student,
            progress: 100,
          };
        }
        return student;
      });
      updateDoc(courseDoc.ref, {
        students: updatedStudents,
      });
    });
  } catch (error) {
    console.error("Error marking course as complete:", error);
  }
};
