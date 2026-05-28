import React, { useState, useRef } from 'react';

// 1. Таймер обратного отсчёта
function Timer() {
  const [timeLeft, setTimeLeft] = useState(300);
  const intervalRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);

  function handleStart() {
    if (timeLeft <= 0) {
      setTimeLeft(300);
    }
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }

  function handleStop() {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  }

  function handleReset() {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTimeLeft(300);
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div style={{ border: '1px solid #ccc', padding: 10, margin: 10, borderRadius: 8, textAlign: 'center' }}>
      <h2> Таймер обратного отсчёта</h2>
      <h1 style={{ fontSize: 48 }}>{formattedTime}</h1>
      <button onClick={handleStart} style={{ margin: 5, padding: '5px 15px' }}> Старт</button>
      <button onClick={handleStop} style={{ margin: 5, padding: '5px 15px' }}> Стоп</button>
      <button onClick={handleReset} style={{ margin: 5, padding: '5px 15px' }}> Сброс</button>
    </div>
  );
}

// 2. Слайдер
function Slider() {
  const sliderRef = useRef(null);
  const [index, setIndex] = useState(0);
  const news = [
    { id: 1, title: "React 19", content: "Новый компилятор и хуки" },
    { id: 2, title: "TypeScript 5.5", content: "Улучшенная типизация" },
    { id: 3, title: "Vite 6", content: "Мгновенная сборка" }
  ];

  const slideWidth = 280;

  const scrollTo = (i) => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: slideWidth * i,
        behavior: 'smooth'
      });
      setIndex(i);
    }
  };

  const nextSlide = () => scrollTo((index + 1) % news.length);
  const prevSlide = () => scrollTo((index - 1 + news.length) % news.length);

  return (
    <div style={{ border: '1px solid #ccc', padding: 10, margin: 10, borderRadius: 8 }}>
      <h2> Новостной слайдер</h2>
      <div 
        ref={sliderRef} 
        style={{ 
          display: 'flex', 
          overflowX: 'scroll', 
          scrollBehavior: 'smooth',
          gap: 15,
          padding: 10,
        }}
      >
        {news.map((item, i) => (
          <div 
            key={i} 
            style={{ 
              minWidth: slideWidth,
              background: '#f0f0f0', 
              padding: 20,
              borderRadius: 10,
              border: '1px solid #ddd',
              textAlign: 'center'
            }}
          >
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 10, textAlign: 'center' }}>
        <button onClick={prevSlide} style={{ margin: 5, padding: '5px 15px' }}> Назад</button>
        <button onClick={nextSlide} style={{ margin: 5, padding: '5px 15px' }}>Вперед </button>
        <p>Слайд {index + 1} из {news.length}</p>
      </div>
    </div>
  );
}

// 3. Статьи (связанные состояния)
function Article({ title, content, isActive, onShow }) {
  return (
    <div style={{ 
      border: '1px solid #ccc', 
      margin: 5, 
      padding: 10, 
      borderRadius: 5,
      backgroundColor: isActive ? '#e3f2fd' : 'white'
    }}>
      <b>{title}</b>
      {isActive ? <p>{content}</p> : <button onClick={onShow}> Читать</button>}
    </div>
  );
}

function Articles() {
  const [activeId, setActiveId] = useState(null);
  const articles = [
    { id: 1, title: "Выход React 19", content: "React 19 выйдет в 2025 году с новым компилятором." },
    { id: 2, title: "JavaScript 2025", content: "Новые возможности ES2025 уже в разработке." },
    { id: 3, title: "AI в программировании", content: "ИИ помогает писать код, но не заменяет разработчика." }
  ];

  return (
    <div style={{ border: '1px solid #ccc', padding: 10, margin: 10, borderRadius: 8 }}>
      <h2> Статьи</h2>
      {articles.map(a => (
        <Article 
          key={a.id} 
          title={a.title} 
          content={a.content} 
          isActive={activeId === a.id} 
          onShow={() => setActiveId(a.id)} 
        />
      ))}
    </div>
  );
}

// ГЛАВНЫЙ КОМПОНЕНТ APP
export default function App() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}> СМИ для программистов</h1>
      <Timer />
      <Slider />
      <Articles />
    </div>
  );
}