import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Register.module.css';

function Login() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const confirmRegister = (e) => {
        e.preventDefault();
        const url = "http://localhost:3333/createUser";
        const data = {
            name: name,
            username: username,
            password: password,
            points: 0
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
        navigate("/", { state: { userData: data } });
        })
        .catch(error => {
        alert("Wrong credentials");
        });
    };

    const goToLogin = () => {
        navigate("/")
    }

    return (
        <div className={styles.registerContainer}>
        <h2>get registered</h2>
        <form className={styles.registerForm} onSubmit={confirmRegister}>
            <div>
                <label>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
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
            <button type="submit">confirm</button>
        </form>
        <button className={styles.button} onClick={goToLogin}>go to login</button>
        </div>
    );
}

export default Login;
