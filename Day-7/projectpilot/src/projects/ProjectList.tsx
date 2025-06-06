import { useState } from 'react';
import { Project } from './Project';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';

interface ProjectListProps {
  projects: Project[];
  onSave: (project: Project) => void;
  onDelete: (project: Project) => void;
}

function ProjectList({ projects, onSave, onDelete }: ProjectListProps) {
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
  const cancelEditing  = () =>{
    console.log("canceling project edit: " , projectBeingEdited); 
    setProjectBeingEdited({});
  }

  return (
    <div className="row">
      {projects.map((project) => (
        <div key={project._id} className="cols-sm">
           { 
            project === projectBeingEdited ? (
              <ProjectForm onCancel={cancelEditing} onSave={onSave} onDelete={onDelete} project={project} isEdit={true}/>
            ) :
            (
              <ProjectCard project={project}  onEdit={handleEdit}/>
            )
            }
        </div>
      ))}
    </div>
  );
}

export default ProjectList;