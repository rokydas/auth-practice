import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './Login.css';

const Login = () => {

    const [isNew, setIsNew] = useState(true)

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="login-box">
                <h3 className="text-center">{isNew ? "Create an account" : "Sign In"}</h3><br/>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="text" name="firstName" placeholder="Enter First Name" required />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="text" name="lastName" placeholder="Enter Last Name" required />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" name="email" placeholder="Enter Email" required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" name="password" placeholder="Password" required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" name="confirmPassword" placeholder="Confirm Password" required />
                    </Form.Group>
              
                    <Button className="login-btn" type="submit">Sign Up</Button><br/><br/>

                    <p className="text-center">{isNew ? 'Already have an account? ' : 'New User? '} 
                    <span className="toggle-btn" onClick={() => setIsNew(!isNew)}>{isNew ? 'Sign Up' : 'Sign In'}</span></p><br/>

                    <Button className="login-btn" type="submit">Continue with Google</Button><br/><br/>
                    <Button className="login-btn" type="submit">Continue with Facebook</Button><br/><br/>
                  
                </Form>
            </div>
            
        </div>
    );
};

export default Login;