import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f2f5;
  background-color: #e3f2fd;
`;

const SignupForm = styled(Form)`
  max-width: 400px;
  width: 100%;
  padding: 30px;
  background: skyblue;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
`;

const StyledInput = styled(Input)`
  height: 48px;
  width: 100%;
`;

const StyledPasswordInput = styled(Input.Password)`
  height: 48px;
  width: 100%;
`;

const SignupButton = styled(Button)`
  width: 100%;
  background-color: #0056b3;
  border-color: #0056b3;
  color: #fff;

  &:hover {
    background-color: #004494;
    border-color: #004494;
  }
`;

const SignUpLink = styled(Link)`
  color: #0056b3;
  &:hover {
    color: #003d7a;
  }
`;

const BlockbusterText = styled.h2`
  text-align: center;
  color: #ffffff;
  margin-bottom: 16px;
  font-size: 36px;
  font-family: 'Georgia', serif;
  letter-spacing: 1px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.8);
`;

const Signup = () => {
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const openNotification = (type, message) => {
    notification[type]({
      message: 'Signup Attempt',
      description: message,
      placement: 'top',
      duration: 3,
    });
  };

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:8091/api/signup', values);
      setEmail(values.email);
      setShowOtp(true);
      openNotification('success', 'OTP sent to your email! Please verify.');
    } catch (error) {
      console.error('Signup failed:', error.message);
      if (error.response) {
        if (error.response.status === 409) {
          openNotification('error', 'Email already exists. Please try another email.');
        } else {
          openNotification('error', error.response.data.message);
        }
      } else {
        openNotification('error', 'Signup failed. Please try again later.');
      }
    }
  };
  
  const verifyOtp = async () => {
    try {
      // Verify the OTP
      const response = await axios.post('http://localhost:8091/api/signup/verify', null, {
        params: { email: email, otp: parseInt(otp) },
      });
      openNotification('success', response.data.message);
      navigate('/login'); // Redirect to login after successful OTP verification
    } catch (error) {
      console.error('OTP verification failed:', error.message);
      if (error.response) {
        openNotification('error', error.response.data.message);
      } else {
        openNotification('error', 'OTP verification failed. Please try again later.');
      }
    }
  };

  return (
    <SignupContainer>
      {!showOtp ? (
        // Signup form container
        <SignupForm name="signup-form" onFinish={onFinish}>
          <BlockbusterText>Sign Up to AspireAide</BlockbusterText>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <StyledInput prefix={<UserOutlined />} placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
          >
            <StyledInput prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <StyledPasswordInput prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <SignupButton type="primary" htmlType="submit">
              Sign Up
            </SignupButton>
          </Form.Item>
          <Form.Item>
            <p>
              Already have an account? <SignUpLink to="/login">Click here to log in</SignUpLink>
            </p>
          </Form.Item>
        </SignupForm>
      ) : (
        // OTP verification form container
        <SignupForm name="otp-form">
          <BlockbusterText>Verify Your OTP</BlockbusterText>
          <Form.Item
            name="otp"
            rules={[{ required: true, message: 'Please input your OTP!' }]}
          >
            <StyledInput 
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
          </Form.Item>
          <Form.Item>
            <SignupButton type="primary" onClick={verifyOtp}>
              Verify OTP
            </SignupButton>
          </Form.Item>
        </SignupForm>
      )}
    </SignupContainer>
  );
};

export default Signup;
