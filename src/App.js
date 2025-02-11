import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateProject from "./components/CreateProject";
import MyProjects from "./components/MyProjects";
import ProjectDetails from "./pages/ProjectDetails";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/my-projects" element={<MyProjects />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
