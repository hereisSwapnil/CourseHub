// importing firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "coursehub-9a761.firebaseapp.com",
  projectId: "coursehub-9a761",
  storageBucket: "coursehub-9a761.appspot.com",
  messagingSenderId: "740574193119",
  appId: "1:740574193119:web:7ddc31318a13a40499906a",
  measurementId: "G-66H6N6L8G1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(); // Use getAuth() to get the authentication instance
const googleAuthProvider = new GoogleAuthProvider();
const firestore = getFirestore(); // Use getFirestore() to get the Firestore instance

export { firestore, auth, googleAuthProvider };

// Faking data
import { faker } from "@faker-js/faker";

const generateFakeStudent = () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  progress: faker.number.int({ min: 0, max: 100 }),
});

const courseData = {
  id: faker.string.uuid(),
  name: faker.lorem.words(),
  instructor: faker.person.fullName(),
  description: faker.lorem.paragraph(),
  enrollmentStatus: "Open",
  thumbnail: faker.image.imageUrl(),
  duration: "8 weeks",
  schedule: "Tuesdays and Thursdays, 6:00 PM - 8:00 PM",
  location: "Online",
  prerequisites: ["Basic JavaScript knowledge", "Familiarity with React"],
  syllabus: [
    {
      week: 1,
      topic: "Introduction to React Native",
      content:
        "Overview of React Native, setting up your development environment.",
    },
    {
      week: 2,
      topic: "Building Your First App",
      content: "Creating a simple mobile app using React Native components.",
    },
  ],
  students: Array.from({ length: 4 }, generateFakeStudent),
};

// console.log(courseData);

const addCourseToFirebase = async () => {
  try {
    const docRef = await addDoc(collection(firestore, "courses"), courseData);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// addCourseToFirebase();
