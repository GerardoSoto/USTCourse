/* eslint-disable prefer-const */
import { useState, type SyntheticEvent } from "react";
import { Project } from "./Project";

interface ProjectFormProps {
  isEdit: boolean;
  project: Project
  onSave: (project: Project) => void;
  onCancel: () => void;
  onDelete: (project: Project) => void;
}



function ProjectForm({ onSave, onCancel, onDelete, project: initialProject , isEdit }: ProjectFormProps) {

  const [active, setActive] = useState(true);
  const [project, setProject] = useState(initialProject);
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    budget: '',
  });

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    //onSave(new Project({name: 'Updated Project'}));
    console.log(project);
    if (!isValid()){
      console.log("is not a valid form");
      return;
    }
      
    console.log("saving...." + project);
    onSave(project);
  }

  const handleDelete = (event: SyntheticEvent) => {
    event.preventDefault();
    //! Maybe some validations here
    let text = "Are you sure you want to delete this project?";
    if (confirm(text) == true) {
      onDelete(project);
    } 

    
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    const { type, name, value, checked } = event.target;
    // if input type is checkbox use checked
    // otherwise it's type is text, number etc. so use value
    let updatedValue = type === 'checkbox' ? checked : value;

    //if input type is number convert the updatedValue string to a +number
    if (type === 'number') {
      updatedValue = Number(updatedValue);
    }

    const change = {
      [name]: updatedValue,
    }

    let updatedProject: Project;
    // need to do functional update b/c
    // the new project state is based on the previous project state
    // so we can keep the project properties that aren't being edited +like project.id
    // the spread operator (...) is used to
    // spread the previous project properties and the new change
    setProject((p) => {
      updatedProject = new Project({ ...p, ...change });
      return updatedProject;
    });

    setActive(false);
    setErrors(() => validate(updatedProject));
  }


  function validate(project: Project) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let errors: any = { name: '', description: '', budget: '' };

    if (project.name.length === 0 ) {
      errors.name = 'Name is required';
    }

    if (project.name.length > 0 && project.name.length < 3) {
      errors.name = 'Name needs to be at least 3 characters.';
    }
     console.log(errors.name);

    if (project.description.length === 0) {
      errors.description = 'Description is required.';
    }
     console.log(errors.description);

    if (project.budget === 0) {
      errors.budget = 'Budget must be more than $0.';
    }
     console.log(errors.budget);
    return errors;
  }

  function isValid() {
    console.log("validating.......")
    return (
      errors.name.length === 0 &&
      errors.description.length === 0 &&
      errors.budget.length === 0
    );
  }

  return (
    <form className="input-group vertical" onSubmit={handleSubmit}>
      <label htmlFor="name">Project Name</label>
      <input
        type="text"
        name="name"
        placeholder="enter name"
        value={project.name}
        onChange={handleChange} />

      {errors.name.length > 0 && (
        <div className="card error">
          <p>{errors.name}</p>
        </div>
      )}

      <label htmlFor="description">Project Description</label>
      <textarea
        name="description"
        placeholder="enter description"
        value={project.description}
        onChange={handleChange} />

      {errors.description.length > 0 && (
        <div className="card error">
          <p>{errors.description}</p>
        </div>
      )}


      <label htmlFor="budget">Project Budget</label>
      <input
        type="number"
        name="budget"
        placeholder="enter budget"
        value={project.budget}
        onChange={handleChange} />

      {errors.budget.length > 0 && (
        <div className="card error">
          <p>{errors.budget}</p>
        </div>
      )}

      <label htmlFor="isActive">Active?</label>
      <input
        type="checkbox"
        name="isActive"
        checked={project.isActive}
        onChange={handleChange} />

      <div className="input-group">
        <button className="primary bordered medium" disabled={active} >Save</button>
        <span />
        
        {
          isEdit && (<>
            <button type="button" className="bordered medium" onClick={onCancel}>
              cancel
            </button>

            <button type="button" className="bordered medium" onClick={handleDelete}>
              Delete
            </button>
          </>
          )}
        {/* <button type="button" className="bordered medium" onClick={onCancel}>
          cancel
        </button> */}
      </div>
    </form>
  );
}

export default ProjectForm;