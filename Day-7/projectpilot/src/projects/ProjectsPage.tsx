import React, { useState, useEffect } from "react";
// import { MOCK_PROJECTS } from "./MockProjects";
import { projectAPI } from "./projectAPI";
import ProjectList from "./ProjectList";
import { Project } from "./Project";

function ProjectsPage() {
  //const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  // Approach 1: using promise then
  //  useEffect(() => {
  //    setLoading(true);
  //    projectAPI
  //      .get(1)
  //      .then((data) => {
  //        setError(null);
  //        setLoading(false);
  //        setProjects(data);
  //      })
  //      .catch((e) => {
  //        setLoading(false);
  //        setError(e.message);
  //        if (e instanceof Error) {
  //           setError(e.message);
  //        }
  //      });
  //  }, []);

  // Approach 2: using async/await
  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      try {
        const data = await projectAPI.get();
        setError('');
        setProjects(data);
      }
       catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
        } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  const saveProject = (project: Project) => {
    //console.log('Saving Project: ', project);

    // const updatedProjects = projects.map((p: Project) => {
    //   return p.id === project.id ? project : p;
    // });
    // setProjects(updatedProjects);

   projectAPI
     .put(project)
     .then((updatedProject) => {
       const updatedProjects = projects.map((p: Project) => {
         return p.id === project.id ? new Project(updatedProject) : p;
       });
       setProjects(updatedProjects);
     })
     .catch((e) => {
        if (e instanceof Error) {
         setError(e.message);
        }
     });
  }

  return <>
    <h1>Projects</h1>
    {/* <pre>{JSON.stringify(MOCK_PROJECTS,null,' ')}</pre> */}
    {/* //<ProjectList projects={MOCK_PROJECTS} onSave={saveProject}/> */}

      {error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {error}
              </p>
            </section>
          </div>
        </div>
      )}


    <ProjectList onSave={saveProject} projects={projects} />

      {loading && (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      )}
  </>;
}

export default ProjectsPage;

