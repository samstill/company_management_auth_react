// src/components/Admin/UserForm.js
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const UserForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ email: '', password: '', role: 'customer' });

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Minimum 8 characters').required('Required'),
    role: Yup.string().required('Required'),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Formik
      initialValues={{ email: '', password: '', role: 'customer' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
    <Form>
        <Field name="email" type="email" placeholder="Email" />
        <ErrorMessage name="email" />
        {/* ... other fields */}
        <button type="submit">Create User</button>
    </Form>
    </Formik>
  );
};

export default UserForm;
