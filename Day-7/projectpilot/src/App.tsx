// import Greeter from "./Greeter/Greter";
//import Hello from "./Function-Component/Hello";
// import Hello from "./Class-coponent/Hello";
import { BrowserRouter, NavLink, Route, Routes } from "react-router";
import ProjectsPage from "./projects/ProjectsPage";
import HomePage from "./Home/HomePage";
import ProjectPage from "./projects/ProjectPage";
import NewProjectPage from "./projects/NewProjectPage";
import { Container } from "@mui/material";
import LoginPage from "./LoginComponent/LoginPage";
import RegisterPage from "./LoginComponent/RegisterPage";
import { useState } from "react";

function App() {
  // return (
  //   //Agrega nuevos componentes
  //  <div className="container">
  //    <ProjectsPage />
  //    {/* <Greeter first="Gerardo" last="Soto"/> */}
  //    {/* <Hello name="David" enthusiasmLevel={3}></Hello> */}

  //  </div>
  //  );

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [appError, setAppError] = useState<string | null>(null);

  const handleLoginSuccess = (token: string) => {
    setIsLoggedIn(true);
    setUserToken(token);
    setAppError(null); // Clear any previous app-level errors
    console.log('Login successful! Token:', token);
    // Redirect or perform other actions after login
  };

  const handleLoginError = (error: string) => {
    setIsLoggedIn(false);
    setUserToken(null);
    setAppError(`Login failed: ${error}`);
    console.error('Login failed:', error);
  };

  return (
    // Material UI
    <Container fixed>
      <BrowserRouter>
        <header className="sticky">
          <span className="logo">
            <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
          </span>
          <NavLink to="/" className="button rounded">
            <span className="icon-home"></span>
            Home
          </NavLink>
          <NavLink to="/projects" className="button rounded">
            Projects
          </NavLink>
          <NavLink to="/project" className="button rounded">
            New Project
          </NavLink>

          {isLoggedIn ? (
            <NavLink to="/login" className="button rounded">
              LogOut
            </NavLink>
          ) : (<>
            <NavLink to="/login" className="button rounded">
              LogIn
            </NavLink>

            <NavLink to="/register" className="button rounded">
              Sing Up
            </NavLink>
          </>
          )
          }

        </header>

        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectPage />} />
            <Route path="/project" element={<NewProjectPage />} />
            <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} onLoginError={handleLoginError} />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Container>

  );
}

export default App;
