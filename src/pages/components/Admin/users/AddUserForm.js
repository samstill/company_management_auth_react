import React, { useState } from 'react';
import { Button, Input, Label } from '@harshitpadha/themes'; // Import necessary components
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9em;
`;

const generatePassword = () => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};

const AddUserForm = ({ onAddUser, onCancel }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const newUser = {
      first_name: firstName,
      last_name: lastName,
      email,
      role,
      password,
    };
    onAddUser(newUser); // Call the onAddUser function passed from the parent component
  };

  const handleGeneratePassword = () => {
    const newPassword = generatePassword();
    setPassword(newPassword);
    setConfirmPassword(newPassword);
    setError(''); // Clear any previous error
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="firstName">First Name</Label>
      <Input
        id="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="Enter first name"
        required
      />

      <Label htmlFor="lastName">Last Name</Label>
      <Input
        id="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Enter last name"
        required
      />

      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
        required
      />

      <Label htmlFor="role">Role</Label>
      <Input
        id="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="Enter role"
        required
      />

      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        required
      />

      <Label htmlFor="confirmPassword">Confirm Password</Label>
      <Input
        id="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm password"
        required
      />

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Button type="button" onClick={handleGeneratePassword} style={{ marginBottom: '10px' }}>
        Generate Strong Password
      </Button>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <Button type="submit">Add User</Button>
        <Button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default AddUserForm;
