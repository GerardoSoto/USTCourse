import { NavLink, Route, Routes } from "react-router";
import { useNavigate } from 'react-router-dom';
import ProjectsPage from "./projects/ProjectsPage";
import HomePage from "./Home/HomePage";
import ProjectPage from "./projects/ProjectPage";
import NewProjectPage from "./projects/NewProjectPage";
import LoginPage from "./LoginComponent/LoginPage";
import RegisterPage from "./LoginComponent/RegisterPage";
import { useEffect, useState } from "react";
import type { IAuth } from "./Auth/IAuth";
import { authServiceAPI } from "./services/auth.service";
import { Grid } from "@mui/material";

function App() {
  const navigate = useNavigate();

  const [userToken, setUserToken] = useState<string | null>(null);
  // const [appError, setAppError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<IAuth | null>(null);

  useEffect(() => {
    console.log('Component has mounted! Fetching data...');
    const user = authServiceAPI.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    authServiceAPI.logout();
    setCurrentUser(null);
  }

  const handleLoginSuccess = (auth: IAuth) => {
    setUserToken(auth.accessToken);
    // setAppError(null); // Clear any previous app-level errors
    setCurrentUser(auth);
    console.log('Login successful! Token:', userToken);

    navigate("/projects");
    window.location.reload();
    // Redirect or perform other actions after login
  };

  const handleLoginError = (error: string) => {
    setUserToken(null);
    // setAppError(`Login failed: ${error}`);
    console.error('Login failed:', error);
  };

  return (
    // Material UI
    <>
      <header className="sticky">
        <Grid container spacing={2} >
          <Grid size={8}

            sx={{
              justifyContent: "flex-start",
              alignItems: "stretch",
            }}>
            <span className="logo">
              <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
            </span>
            <NavLink to="/" className="button rounded">
              <span className="icon-home"></span>
              Home
            </NavLink>
            {currentUser && (
              <>
                <NavLink to="/projects" className="button rounded">
                  Projects
                </NavLink>
                <NavLink to="/project" className="button rounded">
                  New Project
                </NavLink>
              </>
            )
            }
          </Grid>

          <Grid
            container
            size={4}
            direction={"row"}
            sx={{
              justifyContent: "flex-end",
              alignItems: "stretch",
            }}>
            {currentUser ? (
              <NavLink to="/login" onClick={logOut} className="button rounded">
                LogOut
              </NavLink>
            ) : (
              <>
                <NavLink to="/login" className="button rounded">
                  LogIn
                </NavLink>

                <NavLink to="/register" className="button rounded">
                  Sing Up
                </NavLink>
              </>
            )
            }
          </Grid>


        </Grid>
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
    </>


  );
}

export default App;
