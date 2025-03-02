import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Comment out the login/register logic
    /*
    if ((!isRegistering && (!email || !password)) || (isRegistering && (!userName || !email || !password))) {
      setMessage('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    const endpoint = isRegistering ? '/api/add/register' : '/api/add/login';
    const data = isRegistering ? { userName, email, password } : { email, password };

    try {
      console.log(`Submitting to ${endpoint} with:`, data);
      const response = await axios.post(`http://localhost:5001${endpoint}`, data);
      console.log('Response:', response.data);
      if (!isRegistering) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        setMessage('Login successful!');
        setTimeout(() => navigate('/dashboard'), 500);
      } else {
        setMessage('Registration successful! Please log in.');
        setIsRegistering(false);
      }
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      setMessage(err.response?.data.msg || 'Error occurred');
    } finally {
      setIsLoading(false);
    }
    */

    // Bypass login and go directly to dashboard
    setMessage('Bypassing login for testing...');
    setTimeout(() => navigate('/dashboard'), 500);
  };

  return (
    <div className="container">
      <div className="login-box">
        <h1>{isRegistering ? 'Register' : 'Welcome Back'}</h1>
        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                disabled={isLoading}
              />
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? (
              <span className="loading">
                <span className="spinner"></span>
                {isRegistering ? 'Registering...' : 'Logging in...'}
              </span>
            ) : (
              isRegistering ? 'Register' : 'Login'
            )}
          </button>
        </form>
        <p className={message.includes('successful') ? 'success' : 'error'}>
          {message}
        </p>
        <div className="forgot-password">
          <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;