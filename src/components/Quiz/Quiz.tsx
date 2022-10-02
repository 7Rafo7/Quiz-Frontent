import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { Container, Form } from 'react-bootstrap';
import NameCard from '../Common/NameCard';
import Matching from '../Matching/Matching';

const Quiz = () => {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState(false);

  const startHandler = () => {
    if (username) {
      setIsQuizStarted(true);
    } else {
      setUsernameError(true);
    }
  };

  const nameInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (usernameError) {
      setUsernameError(false);
    }
    setUsername(e.target.value);
  };

  const restartQuiz = () => {
    setIsQuizStarted(false);
    setUsernameError(false);
    setUsername('');
  };

  const handleSubmitQuiz = (data: { scorePoints: number; questionsCount: number }) => {
    axios
      .post('http://127.0.0.1:5000/save-result', {
        username: username,
        questions: data.questionsCount,
        score: data.scorePoints,
      })
      .then()
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Container>
        <Form autoComplete="off">
          {isQuizStarted ? (
            <Matching onEnd={handleSubmitQuiz} onRestart={restartQuiz} />
          ) : (
            <NameCard
              usernameError={usernameError}
              username={username}
              onNameInputChange={nameInputHandler}
              startHandler={startHandler}
            />
          )}
        </Form>
      </Container>
    </div>
  );
};

export default Quiz;
