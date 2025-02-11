import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css";

const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/projects") // Fetch from JSON Server
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  // 🔍 Search Functionality
  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="homepage-container">
      <h1>All Projects</h1>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search projects..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Display All Projects */}
      <div className="project-list">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div key={project.projectId} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description.split(" ").slice(0, 15).join(" ")}...</p>
              <p>
                <strong>Goal:</strong> ${project.goalAmount}
              </p>
              <p>
                <strong>Deadline:</strong>{" "}
                {new Date(project.deadline).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong> {project.status}
              </p>
              <p>
                <strong>Creator:</strong> {project.user?.name} (
                {project.user?.email})
              </p>

              <Link to={`/project/${project.projectId}`}>
                <button className="details-btn">View Details</button>
              </Link>
            </div>
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
