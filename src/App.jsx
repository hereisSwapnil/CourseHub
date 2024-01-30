import { Routes, Route } from "react-router";
import { Home } from "./Pages/Home/Home";
import { CoursePage } from "./Pages/CoursePage/CoursePage";
import StudentDashboard from "./Pages/StudentDashboard/StudentDashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses/:courseId" Component={CoursePage} />
        <Route path="/dashboard/:userId" Component={StudentDashboard} />
      </Routes>
    </>
  );
}

export default App;
