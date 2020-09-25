import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './Login.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebase.config';

import 'date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const Login = () => {

    if (firebase.apps.length === 0) {
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

    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const newUser = { ...formUser };
        newUser.dob = date;
        setFormUser(newUser);
        console.log(formUser);
    };

    const classes = useStyles();
    const [gender, setGender] = React.useState('');

    const handleChangeGender = (event) => {
        setGender(event.target.value);
        const newUser = { ...formUser };
        newUser.gender = gender;
        setFormUser(newUser);
        console.log(formUser);
    };

    const handleSuccessLogin = (user, provider) => {
        const newUser = {
            name: user.displayName,
            email: user.email,
            img: user.photoURL,
            isSignedIn: true
        }
        setSignedInUser(newUser);
        setNotification('Logged in successfully with ' + provider);
        setNotiDesign({ color: 'green' });
    }

    const handleErrorLogin = (error) => {
        const errorMessage = error.message;
        setNotification(errorMessage);
        setNotiDesign({ color: 'red', textAlign: 'center' });
    }

    const handleGoogleSignin = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then((result) => {
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
            .then((result) => {
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
        setNotiDesign({ color: 'green' })
    }

    const handleOnBlur = (event) => {
        formUser[event.target.name] = event.target.value;
    }

    const handleOnChange = (event) => {

    }

    const handleCreateAccount = (event) => {
        console.log(formUser);
        event.preventDefault();
    }

    const handleLogin = (event) => {

    }

    return (
        <div className="d-flex justify-content-center">
            <div>
                {signedInUser.isSignedIn ?
                    <div style={{ textAlign: 'center' }} className="user">
                        <img src={signedInUser.img} alt="" /><br />
                        <h4>Name: {signedInUser.name}</h4>
                        <h5>Email: {signedInUser.email}</h5>
                        <Button onClick={handleLogOut} className="login-btn" type="submit">Log Out</Button>
                    </div>
                    : <div className="login-box">
                        {/* <h3>{gender}</h3> */}
                        <h3 className="text-center">{isNew ? "Create an account" : "Sign In"}</h3><br />
                        <Form>
                        {isNew && <div>
                                <Form.Group>
                                    <Form.Control onBlur={handleOnBlur} type="text" name="firstName" placeholder="First Name" required />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Control onBlur={handleOnBlur} type="text" name="lastName" placeholder="Last Name" required />
                                </Form.Group>

                                <Form.Group>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Date of Birth"
                                            format="MM/dd/yyyy"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>

                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={gender}
                                            onChange={handleChangeGender}
                                            label="Gender"
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={"Male"}>Male</MenuItem>
                                            <MenuItem value={"Female"}>Female</MenuItem>
                                            <MenuItem value={"Others"}>Others</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Form.Group>
                            </div>}

                            <Form.Group>
                                <Form.Control onBlur={handleOnBlur} type="email" name="email" placeholder="Email" required />
                            </Form.Group>

                            {/* className={`banner ${active ? "active" : ""}`} */}

                            <Form.Group>
                                <Form.Control onChange={handleOnChange} type="password" name="password" placeholder="Password" required />
                            </Form.Group>

                            {isNew && <Form.Group>
                                <Form onChange={handleOnChange} type="password" name="confirmPassword" placeholder="Confirm Password" required />
                            </Form.Group>}

                            <Button onSubmit={handleCreateAccount} variant="primary" type="submit">
                                Submit
                            </Button>

                            {/* <Form.Group>
                                <Form.Control onClick={handleCreateAccount} value="SignUp" type="submit"/>
                            </Form.Group> */}

                            {/* <input className="form-control" onClick={handleCreateAccount} value="new" type="submit"/> */}

                            {/* <input onClick={handleCreateAccount} className="login-btn" type="submit" value={isNew? 'Sign Up' : 'Sign In'}/><br /><br /> */}

                            {/* {isNew ? <Button className="login-btn" onClick={handleCreateAccount} type="submit">Create an account</Button>
                            : <Button className="login-btn" onClick={handleLogin} type="submit">Login</Button>} */}

                            <p className="text-center">{isNew ? 'Already have an account? ' : 'New User? '}
                                <span className="toggle-btn" onClick={() => setIsNew(!isNew)}>{isNew ? 'Sign In' : 'Create an account'}</span></p><br />

                        </Form>
                        <Button onClick={handleGoogleSignin} className="login-btn" type="submit">Continue with Google</Button><br /><br />
                        <Button onClick={handleFbSignin} className="login-btn" type="submit">Continue with Facebook</Button><br /><br />
                        <Button onClick={handleTwitterSignin} className="login-btn" type="submit">Continue with Twitter</Button><br /><br />
                        <Button onClick={handleGithubSignin} className="login-btn" type="submit">Continue with Github</Button><br /><br />
                    </div>}
                <h4 className="notification" style={notiDesign}>{notification}</h4>
            </div>

        </div>
    );
};

export default Login;