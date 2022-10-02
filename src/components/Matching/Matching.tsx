import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { IArmenianAnswer, IMergedAnswers, IResult, IRussianAnswer } from '../../@types/common';
import ResultCard from '../Common/ResultCard';
import ResultList from '../Lists/ResultList';

interface IProps {
  onEnd: (arg0: { scorePoints: number; questionsCount: number }) => void;
  onRestart: () => void;
}

type TData = {
  data: IMergedAnswers[];
  questionsCount: number;
  endedQuestionCount: number;
  page: number;
};

const Matching: React.FC<IProps> = ({ onEnd, onRestart }) => {
  const [allData, setAllData] = useState<TData>({
    data: [],
    questionsCount: 0,
    endedQuestionCount: -1,
    page: 1,
  });

  const [showNextQuestionButton, setShowNextQuestionButton] = useState(false);
  const [scorePoints, setScorePoints] = useState(0);
  const [questionsCount, setQuestionsCount] = useState(0);

  const [currentArmenianList, setCurrentArmenianList] = useState<IArmenianAnswer[]>([]);
  const [currentRussianList, setCurrentRussianList] = useState<IRussianAnswer[]>([]);

  const [resultsList, setResultsList] = useState<IResult[]>([]);

  const [candidateToDrag, setCandidateToDrag] = useState<IResult>({
    armenianTranslation: null,
    russianTranslation: null,
  });

  const showButton = showNextQuestionButton && allData.page !== allData.questionsCount - 1;
  const showResultText = allData.endedQuestionCount === allData.questionsCount;

  const questionOnDrop = (item: IArmenianAnswer) => {
    setCandidateToDrag({
      armenianTranslation: item,
      russianTranslation: candidateToDrag.russianTranslation ?? null,
    });
  };

  const answerToDrop = (item: IRussianAnswer) => {
    setCandidateToDrag({
      armenianTranslation: candidateToDrag.armenianTranslation ?? null,
      russianTranslation: item,
    });
  };

  const onDragExit = () => {
    if (candidateToDrag.armenianTranslation && candidateToDrag.russianTranslation) {
      setCurrentArmenianList(
        currentArmenianList.filter((item) => item.id !== candidateToDrag.armenianTranslation?.id),
      );
      setCurrentRussianList(
        currentRussianList.filter((item) => item.id !== candidateToDrag.russianTranslation?.id),
      );

      setResultsList((resultsList) => [...resultsList, candidateToDrag]);
    }

    setCandidateToDrag({
      armenianTranslation: null,
      russianTranslation: null,
    });
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.currentTarget.classList.add('dragover');
  };

  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.currentTarget.classList.remove('dragover');
  };

  const handleContinue = () => {
    setAllData((prevState) => {
      const currentPage = prevState.page + 1;
      const currentQuestion = prevState.data[currentPage];

      setCurrentRussianList(currentQuestion?.russianTranslations || []);
      setCurrentArmenianList(currentQuestion?.armenianTranslations || []);
      setResultsList([]);

      return {
        ...prevState,
        page: currentPage,
      };
    });

    setShowNextQuestionButton(false);
  };

  useEffect(() => {
    if (showResultText) {
      onEnd({ scorePoints, questionsCount });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showResultText]);

  useEffect(() => {
    if (resultsList.length === 5) {
      let score = 0;

      resultsList.forEach(({ armenianTranslation, russianTranslation }) => {
        if (armenianTranslation?.russianId === russianTranslation?.id) {
          score++;
        }
      });

      setScorePoints(scorePoints + score);
      setAllData((prevState) => ({
        ...prevState,
        endedQuestionCount: prevState.endedQuestionCount + 1,
      }));
      setShowNextQuestionButton(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultsList]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/get-all-questions')
      .then(({ data }) => {
        setQuestionsCount(data.length * 5);
        const currentQuestion = data[0];

        setAllData({
          data,
          endedQuestionCount: 0,
          questionsCount: data.length,
          page: 0,
        });
        setCurrentRussianList(currentQuestion.russianTranslations);
        setCurrentArmenianList(currentQuestion.armenianTranslations);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const restartQuiz = () => {
    setScorePoints(0);
    onRestart();
  };

  return (
    <>
      {showResultText ? (
        <ResultCard
          score={scorePoints}
          questionsLength={questionsCount}
          restartQuiz={restartQuiz}
        />
      ) : (
        <div className="mt-5">
          <h3>Match the translations</h3>
          <div className="custom-container">
            <div className="boxes questions-container">
              {currentArmenianList.map((item) => (
                <div
                  id={item.id}
                  key={item.id}
                  className="box-container"
                  onDragLeave={onDragLeave}
                  onDragOver={onDragOver}
                  onDragEnd={onDragExit}
                  onDragEnter={() => questionOnDrop(item)}
                >
                  <div className="box">{item.text}</div>
                </div>
              ))}
            </div>

            <ResultList resultsList={resultsList} />

            <div className="boxes answers-container">
              {currentRussianList.map((item) => (
                <div
                  id={item.id}
                  key={item.id}
                  className="box-container answer"
                  draggable={true}
                  onDragEnd={onDragExit}
                  onDragStart={() => answerToDrop(item)}
                >
                  <div className="box">{item.text}</div>
                </div>
              ))}
            </div>
          </div>

          {showButton && (
            <Button className="mt-5" variant="success" type="button" onClick={handleContinue}>
              Next Question
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default Matching;
