// importing components
import { Routes, Route } from "react-router";
// importing pages
import { Home } from "./Pages/Home/Home";
import { CoursePage } from "./Pages/CoursePage/CoursePage";
import StudentDashboard from "./Pages/StudentDashboard/StudentDashboard";

function App() {
  return (
    <>
      {/* Creating routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses/:courseId" Component={CoursePage} />
        <Route path="/dashboard/:userId" Component={StudentDashboard} />
      </Routes>
    </>
  );
}

// exporting App
export default App;
