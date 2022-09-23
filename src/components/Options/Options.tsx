import React from "react";
import {Card, ListGroup} from "react-bootstrap";
import {IOption, IQuestion} from "../../@types/common";

interface IProps {
  question: IQuestion
  optionClicked: (arg0: boolean) => void,
}

const Options: React.FC<IProps> = ({question, optionClicked}) => {
  return (
    <Card className={'mt-5'}>
      <h4 className={'mt-3'}>{question.text}</h4>
      <Card.Body>
        <ListGroup as="ul">
          {question.options.map((option: IOption) => (
              <ListGroup.Item as="li" key={option.id} onClick={() => optionClicked(option.isCorrect)}>
                {option.text}
              </ListGroup.Item>
            )
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default Options;