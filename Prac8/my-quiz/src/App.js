import { useState } from 'react';
import './App.css';

const questions = [
  { text: 'Что такое React?', options: ['Библиотека для UI', 'Фреймворк', 'Язык', 'База данных'], correct: 0 },
  { text: 'Хук для состояния?', options: ['useEffect', 'useState', 'useContext', 'useReducer'], correct: 1 },
  { text: 'Что такое JSX?', options: ['Расширение JS', 'База данных', 'Стиль', 'Тип данных'], correct: 0 },
];

function App() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const q = questions[index];
  const isLast = index === questions.length - 1;
  const answered = answers[index] !== undefined;

  const select = (opt) => {
    const newAnswers = [...answers];
    newAnswers[index] = opt;
    setAnswers(newAnswers);
  };

  const next = () => {
    if (!answered) return;
    if (!isLast) setIndex(index + 1);
    else setFinished(true);
  };

  const score = () => questions.filter((q, i) => answers[i] === q.correct).length;

  if (finished) {
    return (
      <div className="quiz">
        <h1>Результат: {score()} / {questions.length}</h1>
        <button onClick={() => window.location.reload()}>Заново</button>
      </div>
    );
  }

  return (
    <div className="quiz">
      <h3>{index + 1} / {questions.length}</h3>
      <p>{q.text}</p>
      {q.options.map((opt, i) => (
        <button key={i} className={answers[index] === i ? 'selected' : ''} onClick={() => select(i)}>
          {opt}
        </button>
      ))}
      <button disabled={!answered} onClick={next}>{isLast ? 'Завершить' : 'Далее'}</button>
    </div>
  );
}

export default App;