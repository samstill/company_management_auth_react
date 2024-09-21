// src/components/Login.js

import React from 'react';
import './styles/Login.css';
import { LoginCard } from '@harshitpadha/auth';

const Login = () => {
  return (
    <div className="login-container">
      <LoginCard buttonText="Sign In" redirectPath="/dashboard" />
    </div>
  );
};

export default Login;
