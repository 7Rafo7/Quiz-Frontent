import React from 'react';
import Welcome from './components/Welcome/Welcome';
import Quiz from './components/Quiz/Quiz';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Welcome />
      <Quiz />
    </div>
  );
}

export default App;
