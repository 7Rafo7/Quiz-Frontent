import React, { ChangeEvent, MouseEventHandler } from 'react';
import { Button, Card, Form } from 'react-bootstrap';

interface IProps {
  usernameError: boolean;
  username: string;
  onNameInputChange: (arg0: ChangeEvent<HTMLInputElement>) => void;
  startHandler: MouseEventHandler;
}

const NameCard: React.FC<IProps> = ({
  usernameError,
  username,
  onNameInputChange,
  startHandler,
}) => {
  const handleNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onNameInputChange(e);
  };

  return (
    <Card style={{ marginTop: 100 }}>
      <h3 className="pt-3">Enter name to start</h3>

      <Card.Body>
        <Form.Group className="mb-3">
          <Form.Control
            className={usernameError ? 'is-invalid' : ''}
            name="name"
            type="text"
            placeholder="Name"
            value={username}
            onChange={handleNameInputChange}
          />

          <Form.Control.Feedback className={usernameError ? 'display-b' : ''} type="invalid">
            Please provide your name.
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="success" type="button" onClick={startHandler}>
          Start
        </Button>
      </Card.Body>
    </Card>
  );
};

export default NameCard;
