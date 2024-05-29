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

  return (
    <div className={styles.dashboardContainer}>
      <h2 className={styles.dashboardHeader}>Dashboard</h2>
      <p className={styles.dashboardInfo}>Welcome, {userData ? userData.name : "undefined"}!</p>
      <p className={styles.dashboardInfo}>Points: {userData ? userData.points : "undefined"}</p>
      <button className={styles.dashboardButton} onClick={handlePlayQuiz}>Play Quiz</button>
      <button className={styles.dashboardButton} onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
