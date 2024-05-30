import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const confirmLogin = (e) => {
    e.preventDefault();
    const url = "http://localhost:3333/getUser";
    const data = {
      username: username,
      password: password
    };
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if(data.id !== undefined) {
            navigate("/dashboard", { state: { userData: data } });
        } 
    })
    .catch(error => {
      alert("Wrong credentials " + error);
    });
  };

  const goToRegister = () => {
    navigate("/register")
  }

  return (
    <div className={styles.loginContainer}>
      <h2>Welcome, get in the Quiz</h2>
      <form className={styles.loginForm} onSubmit={confirmLogin}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">cofirm</button>
      </form>
      <button className={styles.button} onClick={goToRegister}>click here to register</button>
    </div>
  );
}

export default Login;
