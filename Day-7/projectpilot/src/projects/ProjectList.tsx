import { useState } from 'react';
import { Project } from './Project';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';

interface ProjectListProps {
  projects: Project[];
}

function ProjectList({ projects }: ProjectListProps) {
  // return <pre>{JSON.stringify(projects, null, ' ')}</pre>;
  // return (
  //   <ul>
  //     {projects.map((project) => (
  //       <li key={project.id}>{project.name}</li>
  //     ))}
  //   </ul>
  // );

  const [projectBeingEdited, setProjectBeingEdited] = useState({});

  const handleEdit = (project: Project) => {
    console.log(project);
    setProjectBeingEdited(project);
  }

  return (
    <div className="row">
      {projects.map((project) => (
        <div key={project.id} className="cols-sm">
          {/* <ProjectCard project={project}  onEdit={handleEdit}/>
          <ProjectForm /> */}
           { 
            project === projectBeingEdited ? (
              <ProjectForm />
            ) :
            (
              <ProjectCard project={project}  onEdit={handleEdit}/>
            )}
        </div>
      ))}
    </div>
  );
}

export default ProjectList;