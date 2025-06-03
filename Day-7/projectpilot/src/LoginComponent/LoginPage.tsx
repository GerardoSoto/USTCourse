import { useState, type SyntheticEvent } from "react";
import { authServiceAPI } from "../services/auth.service";
import type { IAuth } from "../Auth/IAuth";

interface LoginProps {
  onLoginSuccess: (auth : IAuth) => void;
  onLoginError: (error: string) => void;
}

function LoginPage({onLoginSuccess, onLoginError} : LoginProps){
  
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      // const response = await new Promise<string>((resolve, reject) => {
      //   setTimeout(() => {
      //     if (username === 'user' && password === 'password') {
      //       resolve('fake-auth-token-123'); // Simulate successful login
      //     } else {
      //       reject('Invalid username or password'); // Simulate failed login
      //     }
      //   }, 1500); // Simulate network delay
      // });


      const response = await authServiceAPI.login(username,password);


      onLoginSuccess(response);
    } catch (error) {
      setErrorMessage(error as string);
      onLoginError(error as string);
    } finally {
      setLoading(false);
    }
  };




 return (
  <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            aria-label="Username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Password"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default LoginPage;