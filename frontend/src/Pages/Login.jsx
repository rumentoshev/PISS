import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";

Login.propTypes = {
    onLoginSuccess: PropTypes.func.isRequired,
  };
  
function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8000/user_exist/${email}_${password}`
      );

      if (response.status === 200) {
        onLoginSuccess();
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("Invalid email or password");
      } else {
        setError("An error occurred. Please try again later.");
      }
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
export default Login;