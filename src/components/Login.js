// Login.js
import React from 'react';
import { useAuth, LoginCard } from '@harshitpadha/auth';

const Login = () => {
  const { loginUser } = useAuth();

  const handleLogin = async (email, password) => {
    await loginUser(email, password);
  };

  return (
    <div className="App">
      <h1>Reusable Login Component</h1>
      <LoginCard onLogin={handleLogin} buttonText="Sign In" />
    </div>
  );
};

export default Login;
