import React from 'react';
import { Button, Card } from 'react-bootstrap';

interface IProps {
  score: number;
  questionsLength: number;
  restartQuiz: () => void;
}

const ResultCard: React.FC<IProps> = ({ score, questionsLength, restartQuiz }) => {
  return (
    <Card className="mt-5">
      <h2 className="pt-3">Final Results</h2>
      <h2>
        {score} out of {questionsLength} correct - ({(score / questionsLength) * 100}%)
      </h2>
      <Card.Body>
        <Button variant="success" type="button" onClick={() => restartQuiz()}>
          Restart game
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ResultCard;
