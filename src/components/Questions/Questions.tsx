import React, {useEffect, useState} from "react";
import axios from "axios";
import ResultCard from "../Common/ResultCard";
import Options from "../Options/Options";
import {IQuestion} from "../../@types/common";

interface IProps {
  onSubmit: (arg0: { score: number }) => void,
  onRestart: () => void
}

const Questions: React.FC<IProps> = ({onSubmit, onRestart}) => {
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/get-all-questions').then((res) => {
      setQuestions(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }, []);

  useEffect(() => {
    if (showResults) {
      onSubmit({score})
    }
  }, [showResults])

  const optionClicked = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
    onRestart()
  };

  return (
    <>
      <h2>Score: {score}</h2>

      {showResults ? (
        <ResultCard score={score} questionsLength={questions.length} restartQuiz={restartQuiz}/>
      ) : (
        !!questions.length &&
        <Options question={questions[currentQuestion]} optionClicked={optionClicked}/>
      )}
    </>
  )
}

export default Questions;
