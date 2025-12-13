import React from 'react';

const Projects = () => {
  const projects = [
    { title: 'Project 1', description: 'Description here.', link: 'https://github.com/your-repo' },
    { title: 'Project 2', description: 'Description here.', link: 'https://github.com/your-repo' },
  ];

  return (
    <section id="projects" className="section">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;