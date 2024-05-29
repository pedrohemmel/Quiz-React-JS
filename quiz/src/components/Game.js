import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../styles/Game.module.css';

function Game() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = location.state || {};

  useEffect(() => {
    if (!userData) {
      navigate('/');
      return;
    }

    fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=boolean')
      .then(response => response.json())
      .then(data => setQuestions(data.results))
      .catch(error => console.error('Error fetching questions:', error));
  }, [userData, navigate]);

  const handleAnswerChange = (index, answer) => {
    if (answeredQuestions.find(item => item.i === index)) {
      alert('Question already answered');
      return;
    }

    if (questions[index].correct_answer === answer) {
      setAnswers(answers + 1);
      setAnsweredQuestions([...answeredQuestions, { i: index, point: 1 }]);
    } else {
      setAnsweredQuestions([...answeredQuestions, { i: index, point: 0 }]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (answeredQuestions.length === 5) {
        if(answers >= 3) {
            alert("you earned 1 point!!");
            updateUserPoint();
        } else {
            alert("game over, try it again!!");
            navigate("/dashboard", { state: { userData } })
        }
      
    } else {
      alert("answer all the questions to submit!");
    }
  };

  const updateUserPoint = () => {
    const url = "http://localhost:3333/updateUser";
    const newPoints = userData.points + 1;
    const data = { id: userData.id, points: newPoints };

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
    .then(() => getUser())
    .catch(error => alert("There was a problem updating the points"));
  };

  const getUser = () => {
    const url = "http://localhost:3333/getUser";
    const data = { username: userData.username, password: userData.password };

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => navigate("/dashboard", { state: { userData: data } }))
    .catch(error => alert("Wrong credentials"));
  };

  return (
    <div className={styles.gameContainer}>
      <h2>Game</h2>
      <h4>Get 3 of 5 questions correct to gain 1 point in your account!</h4>
      <h4>{answers}/5</h4>
      <form onSubmit={handleSubmit}>
        {questions.length > 0 ? questions.map((question, index) => (
          <div key={index} className={styles.questionContainer}>
            <p dangerouslySetInnerHTML={{ __html: question.question }}></p>
            <label>
              <input
                type="radio"
                name={`question-${index}`}
                value="true"
                onChange={() => handleAnswerChange(index, 'True')}
                disabled={answeredQuestions.find(item => item.i === index)}
              />
              True
            </label>
            <label>
              <input
                type="radio"
                name={`question-${index}`}
                value="false"
                onChange={() => handleAnswerChange(index, 'False')}
                disabled={answeredQuestions.find(item => item.i === index)}
              />
              False
            </label>
          </div>
        )) : <p>Loading questions...</p>}
        <button className={styles.submitButton} type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Game;
