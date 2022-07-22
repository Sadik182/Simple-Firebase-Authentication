import './App.css';
import { GoogleAuthProvider, GithubAuthProvider, getAuth, signInWithPopup, signOut  } from "firebase/auth";

import initilizeAuthentication from './Firebase/firebase.initialize';
import { useState } from 'react';
const GoogleProvider = new GoogleAuthProvider();
const GithubProvider = new GithubAuthProvider();

initilizeAuthentication();

function App() {

  const [user, setUser] =useState({})
  const auth = getAuth();

  const handleSignIn = () => {
   signInWithPopup(auth, GoogleProvider)
   .then(result => {
     const {displayName, email, photoURL } = result.user;
    const logedInUser = {
      name: displayName,
      email: email,
      photo: photoURL
    }
    setUser(logedInUser);
   })
  }

  const handleGithubSignIn = () => {
    signInWithPopup(auth, GithubProvider)
    .then(result => {
      const {displayName, email, photoURL } = result.user;
     const logedInUser = {
       name: displayName,
       email: email,
       photo: photoURL
     }
     setUser(logedInUser);
    })
  }

  const handleSignOut = () => {
  signOut(auth)
  .then(() => {
    setUser({});
    console.log("Sign-Out Successful");
  }).catch(error => {
    console.log(error.errorMessage);
  });
  }
  const style = {
    marginRight: '15px',
    padding: '10px 20px',
    borderRadius: '5px'
  }
  const style2 = {
    marginLeft: '15px',
    padding: '10px 20px',
    borderRadius: '5px'
  }
  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '5px',
    marginBottom: '10px'
  }
  return (
    <div className="App">
      <h1>Simple Firebase Authentication</h1>
    { !user.name ?
      <div>
        <button style={style} onClick={handleSignIn}>Google Sign In</button>
        <button style={style2} onClick={handleGithubSignIn}>Github Sign In</button>
      </div> :
      <button style={buttonStyle} onClick={handleSignOut}>Sign Out</button>
    }
    <br />
    {
      user.name && <div>
        <img src={user.photo} alt="" />
        <h2>Welcome {user.name}</h2>
        <p>I Know Your Email: {user.email}</p>
      </div> 
    }
    </div>
  );
}

export default App;
