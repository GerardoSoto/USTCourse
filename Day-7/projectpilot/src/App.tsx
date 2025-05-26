// import Greeter from "./Greeter/Greter";
//import Hello from "./Function-Component/Hello";
// import Hello from "./Class-coponent/Hello";
import { BrowserRouter, NavLink, Route, Routes } from "react-router";
import ProjectsPage from "./projects/ProjectsPage";
import HomePage from "./Home/HomePage";
import ProjectPage from "./projects/ProjectPage";

function App() {
  // return (
  //   //Agrega nuevos componentes
  //  <div className="container">
  //    <ProjectsPage />
  //    {/* <Greeter first="Gerardo" last="Soto"/> */}
  //    {/* <Hello name="David" enthusiasmLevel={3}></Hello> */}
     
  //  </div>
  //  );

  return (
    <BrowserRouter>
      <header className="sticky">
        <span className="logo">
          <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
        </span>
        <NavLink to="/"  className="button rounded">
          <span className="icon-home"></span>
          Home
        </NavLink>
        <NavLink to="/projects" className="button rounded">
          Projects
        </NavLink>
      </header>

      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
