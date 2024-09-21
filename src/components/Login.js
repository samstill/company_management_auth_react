// src/components/Login.js

import React from 'react';
import { LoginCard } from '@harshitpadha/auth';

const Login = () => {
  return (
    <div className="App">
      <LoginCard buttonText="Sign In" redirectPath="/dashboard" />
    </div>
  );
};

export default Login;
