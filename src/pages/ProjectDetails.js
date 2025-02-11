import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProjectDetails = () => {
  const { projectId } = useParams(); // Get projectId from URL
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/projects`) // Fetch all projects
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch project details");
        }
        return response.json();
      })
      .then((data) => {
        // Find the specific project using projectId
        const foundProject = data.find(
          (proj) => proj.projectId === Number(projectId)
        );
        if (foundProject) {
          setProject(foundProject);
        } else {
          setError("Project not found");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [projectId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>{project.title}</h2>
      <p>
        <strong>Description:</strong> {project.description}
      </p>
      <p>
        <strong>Goal Amount:</strong> ${project.goalAmount}
      </p>
      <p>
        <strong>Deadline:</strong>{" "}
        {new Date(project.deadline).toLocaleDateString()}
      </p>
      <p>
        <strong>Report:</strong>{" "}
        <a
          href={project.reportPdfUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Report
        </a>
      </p>
      <p>
        <strong>Status:</strong> {project.status}
      </p>
      <h3>Created By</h3>
      <p>
        <strong>Name:</strong> {project.user.name}
      </p>
      <p>
        <strong>Email:</strong> {project.user.email}
      </p>
    </div>
  );
};

export default ProjectDetails;
