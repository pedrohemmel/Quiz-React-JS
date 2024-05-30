// src/components/Introduction.js
import { useNavigate, useLocation } from 'react-router-dom';
import React from 'react';
import styles from '../styles/Introduction.module.css'

const Introduction = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { userData } = location.state || {};

    const goToDashBoard = () => {
        navigate("/dashboard", { state: { userData} })
    }

    return (
        <div className={styles.introductionContainer}>
            <h1>Bem-vindo ao Quiz!</h1>
            <p>Test your knowledge with our fun and challenging quizzes. Are you ready to start?</p>
            <button onClick={goToDashBoard}>go back to dashboard</button>
        </div>
    );
}

export default Introduction;
