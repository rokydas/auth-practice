import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './Login.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebase.config';

const Login = () => {

    if(firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    } 

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const githubProvider = new firebase.auth.GithubAuthProvider();
    const twitterProvider = new firebase.auth.TwitterAuthProvider();

    // all states
    const [isNew, setIsNew] = useState(true);
    const [notification, setNotification] = useState('');
    const [notiDesign, setNotiDesign] = useState({});
    const [formUser, setFormUser] = useState({});
    const [signedInUser, setSignedInUser] = useState({
        isSignedIn: false
    });

    const handleSuccessLogin = (user, provider) => {
        const newUser = {
            name: user.displayName,
            email: user.email,
            img: user.photoURL,
            isSignedIn: true
        }
        setSignedInUser(newUser);
        setNotification('Logged in successfully with ' + provider);
        setNotiDesign({color: 'green'});
    }

    const handleErrorLogin = (error) => {
        const errorMessage = error.message;
        setNotification(errorMessage);
        setNotiDesign({color: 'red', textAlign: 'center'});
    }

    const handleGoogleSignin = () => {
        firebase.auth().signInWithPopup(googleProvider)
        .then( (result) => {
            const user = result.user;
            handleSuccessLogin(user, 'Google');
          })
        .catch((error) => {
            handleErrorLogin(error);
          });
    }

    const handleFbSignin = () => {
        firebase.auth().signInWithPopup(fbProvider)
        .then((result) => {
            const user = result.user;
            handleSuccessLogin(user, 'Facebook');
          }).catch((error) => {
            handleErrorLogin(error);
          });
    }

    const handleTwitterSignin = () => {
        firebase.auth().signInWithPopup(twitterProvider)
        .then( (result) => {
            const user = result.user;
            handleSuccessLogin(user, 'Twitter');
          })
        .catch((error) => {
            handleErrorLogin(error);
          });
    }

    const handleGithubSignin = () => {
        firebase.auth().signInWithPopup(githubProvider)
        .then((result) => {
            const user = result.user;
            handleSuccessLogin(user, 'Github');
          }).catch((error) => {
            handleErrorLogin(error);
          });
    }

    const handleLogOut = () => {
        setSignedInUser({
            isSignedIn: false
        })
        setNotification('Logged Out Successfully');
        setNotiDesign({color: 'green'})
    }

    return (
        <div className="d-flex justify-content-center">
            <div>
                {signedInUser.isSignedIn ?
                <div style={{textAlign: 'center'}} className="user">
                    <img src={signedInUser.img} alt=""/><br/>
                    <h4>Name: {signedInUser.name}</h4>
                    <h5>Email: {signedInUser.email}</h5>
                    <Button onClick={handleLogOut} className="login-btn" type="submit">Log Out</Button>
                </div>
                : <div className="login-box">
                    <h3 className="text-center">{isNew ? "Create an account" : "Sign In"}</h3><br/>
                    <Form>
                        <Form.Group>
                            <Form.Control type="text" name="firstName" placeholder="Enter First Name" required />
                        </Form.Group>

                        <Form.Group>
                            <Form.Control type="text" name="lastName" placeholder="Enter Last Name" required />
                        </Form.Group>

                        <Form.Group>
                            <Form.Control type="email" name="email" placeholder="Enter Email" required />
                        </Form.Group>

                        <Form.Group>
                            <Form.Control type="password" name="password" placeholder="Password" required />
                        </Form.Group>

                        <Form.Group>
                            <Form.Control type="password" name="confirmPassword" placeholder="Confirm Password" required />
                        </Form.Group>
                
                        <Button className="login-btn" type="submit">Sign Up</Button><br/><br/>

                        <p className="text-center">{isNew ? 'Already have an account? ' : 'New User? '} 
                        <span className="toggle-btn" onClick={() => setIsNew(!isNew)}>{isNew ? 'Sign In' : 'Create an account'}</span></p><br/>
                    
                    </Form>
                    <Button onClick={handleGoogleSignin} className="login-btn" type="submit">Continue with Google</Button><br/><br/>
                    <Button onClick={handleFbSignin} className="login-btn" type="submit">Continue with Facebook</Button><br/><br/>
                    <Button onClick={handleTwitterSignin} className="login-btn" type="submit">Continue with Twitter</Button><br/><br/>
                    <Button onClick={handleGithubSignin} className="login-btn" type="submit">Continue with Github</Button><br/><br/>
                </div>}
                <h4 className="notification" style={notiDesign}>{notification}</h4>
            </div>
            
        </div>
    );
};

export default Login;