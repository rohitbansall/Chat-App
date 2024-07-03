import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { auth,storage,db } from "../firebase";
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from 'react';
import Add from "../img/addAvatar.png";
import {useNavigate, Link } from "react-router-dom";


const Register = () => {
  const navigate = useNavigate()

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [err, setErr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/");
    try {
      console.log("whatsup");
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);
      navigate("/");
  
      // Create the file metadata
      /** @type {any} */
      const metadata = {
        contentType: 'image/jpeg'
      };
  
      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);
  
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
        (snapshot) => {
          // You can use snapshot here to track the upload progress if needed
        },
        (error) => {
          // A full list of error codes is available at
          setErr(true);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName, 
              photoURL: downloadURL
            });
  
            // Create user on Firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
  
            // Create empty user chats on Firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
  
            // Navigate to home page
            
          });
        }
      );
    } catch (error) {
      console.error("Error during sign up:", error);
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Rohit Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input
            required
            type="text"
            placeholder="display name"
            name="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <input
            required
            type="email"
            placeholder="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input style={{ display: "none" }} type="file" id="file" />
              <label htmlFor="file">
                 <img src={Add} alt="" />
                  <span>Add an avatar</span>
              </label>

          <button disabled={loading}>Sign up</button>
           
          {err && <span>Something went wrong</span>}
        </form>
        <p>You already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

export default Register;
