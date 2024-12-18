import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { Fstore } from '../../firebase/Config';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);  // Loading state
  const [error, setError] = useState('');  // Error state for validation
  const { Fauth } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const validateForm = () => {
    // Basic validation
    if (!username || !email || !phone || !password) {
      setError('All fields are required');
      return false;
    }
    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email.match(emailPattern)) {
      setError('Please enter a valid email address');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;  // Prevent submission if validation fails

    setLoading(true);  // Start loading
    createUserWithEmailAndPassword(Fauth, email, password)
      .then((result) => {
        const user = result.user;
        updateProfile(user, { displayName: username })
          .then(() => {
            addDoc(collection(Fstore, 'users'), {
              id: result.user.uid,
              username: username,
              phone: phone,
            }).then(() => {
              setLoading(false);  // Stop loading
              navigate('/login');
            });
          })
          .catch((error) => {
            setLoading(false);  // Stop loading
            setError('Error updating profile');
          });
      })
      .catch((error) => {
        setLoading(false);  // Stop loading
        setError('Error signing up: ' + error.message);
      });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" alt="" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="lname"
            name="phone"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
          />
          <br />
          {error && <div style={{ color: 'red' }}>{error}</div>} {/* Show validation errors */}
          <br />
          <button disabled={loading}>
            {loading ? 'Loading.......' : 'Signup'}
          </button>
        </form>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
