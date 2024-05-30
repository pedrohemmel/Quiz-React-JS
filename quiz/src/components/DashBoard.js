import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../styles/DashBoard.module.css';

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = location.state || {};

  useEffect(() => {
    // Se tentarem entrar sem o login do usuário, retorna para a área de login
    if (!userData) {
      navigate('/');
      return;
    }
  }, [userData, navigate]);

  const handleLogout = () => {
    navigate('/');
  };

  const handlePlayQuiz = () => {
    navigate('/game', { state: { userData } });
  };

  const goToIntroduction = () => {
    navigate("/introduction", { state: {userData}})
  }

  return (
    <div className={styles.dashboardContainer}>
        <h2 className={styles.dashboardHeader}>Dashboard</h2>
        
        <button className={styles.faq} onClick={goToIntroduction}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"/>
            </svg>
        </button>

        <p className={styles.dashboardInfo}>Welcome, {userData ? userData.name : "undefined"}!</p>
        <p className={styles.dashboardInfo}>Points: {userData ? userData.points : "undefined"}</p>
        <button className={styles.dashboardButton} onClick={handlePlayQuiz}>Play Quiz</button>
        <button className={styles.dashboardButton} onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
