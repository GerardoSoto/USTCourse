import { useState } from "react";
import { Project } from "./Project";
import ProjectForm from "./ProjectForm";
import { projectAPI } from "./projectAPI";

// interface NewProjectProps{
//   onSave: (project: Project) => void;
// }

function NewProjectPage() {
const newProject = new Project();
  
 const [projectBeingEdited, setProjectBeingEdited] = useState({});

 const cancelEditingFake  = () =>{
    console.log("canceling project edit: " , projectBeingEdited); 
    setProjectBeingEdited({});
  }

  const saveNewProject = (project:Project) =>{
    console.log("Saving New Project");
    projectAPI.post(project)
    .then((response) => {
      console.log(response);
      alert(response.message);
    })
    .catch((err) => {
      alert(err);
    });
  }

  const deleteProjectFake = () => {
    console.log("deleting....")
  }

  return (
    <div className="Row">
      <ProjectForm onCancel={cancelEditingFake} onDelete={deleteProjectFake} onSave={saveNewProject} project={newProject} isEdit={false}></ProjectForm>
    </div>
  );
}

export default NewProjectPage;