// actions/courseActions.js
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

// New action to update search term

export const fetchCourses = (searchTerm) => async (dispatch) => {
  try {
    dispatch(fetchCoursesStart());

    const coursesCollection = collection(firestore, "courses");

    // Create a base query
    let baseQuery = query(coursesCollection);

    // Execute the query
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

    // Check if the user is already enrolled
    const isUserEnrolled = enrolledUsers.some((user_) => user_.id === user.id);
    if (isUserEnrolled) {
      throw new Error("User is already enrolled in this course");
    }
    user.progress = 0;
    const updatedEnrolledUsers = arrayUnion(...enrolledUsers, user);
    await updateDoc(doc(firestore, "courses", courseDoc.id), {
      students: updatedEnrolledUsers,
    });

    // Update user document in the "students" collection
    // const studentRef = doc(collection(firestore, "students"), user.id);
    // const studentData = {
    //   enrolledCourses: arrayUnion(courseId),
    //   // Add other details as needed
    // };

    // await setDoc(studentRef, studentData, { merge: true });

    // Dispatch any success action if needed
  } catch (error) {
    console.error("Error enrolling in the course:", error);
    // Dispatch any failure action if needed
  }
};

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

    // Check if the user is enrolled in the course
    const isUserEnrolled = enrolledUsers.some((user_) => user_.id === user.id);
    if (!isUserEnrolled) {
      throw new Error("User is not enrolled in this course");
    }

    // Remove the user from the enrolled users array
    const updatedEnrolledUsers = arrayRemove(
      ...enrolledUsers.filter((u) => u.id === user.id)
    );
    await updateDoc(doc(firestore, "courses", courseDoc.id), {
      students: updatedEnrolledUsers,
    });

    // Remove the course from the user's enrolledCourses array
    // const studentRef = doc(collection(firestore, "students"), user.id);
    // const studentData = {
    //   enrolledCourses: arrayRemove(courseId),
    //   // Add other details as needed
    // };

    // await setDoc(studentRef, studentData, { merge: true });

    // Dispatch any success action if needed
  } catch (error) {
    console.error("Error unenrolling from the course:", error);
    // Dispatch any failure action if needed
  }
};

export const getEnrolledCourses = async (userId, dispatch) => {
  try {
    // Fetch all courses

    const coursesRef = collection(firestore, "courses");
    const coursesSnapshot = await getDocs(coursesRef);

    const enrolledCoursesDetails = [];

    // Iterate through all courses
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

    // Set loading to false before returning the data
    return enrolledCoursesDetails;
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    throw error; // Propagate the error for handling in the calling code
  }
};

export const fetchEnrolledCourses = (userId) => async (dispatch) => {
  try {
    // Set loading to true before making the request
    dispatch(setLoading(true));

    const enrolledCourses = await getEnrolledCourses(userId, dispatch);

    dispatch(setSuccess(enrolledCourses));
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    dispatch(setError(error.message));
  }
};

export const markAsComplete = (userId, courseId) => async (dispatch) => {
  try {
    // Reference to the "courses" collection
    const courseRef = collection(firestore, "courses");

    // Query to find the course by courseId
    const q = query(courseRef, where("id", "==", courseId));
    const courseSnapshot = await getDocs(q);

    // Check if the course exists
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

      // Update the document in the "courses" collection
      updateDoc(courseDoc.ref, {
        students: updatedStudents,
      });
    });
  } catch (error) {
    console.error("Error marking course as complete:", error);
    // Handle the error as needed
    // dispatch(someErrorAction(error));
  }
};
