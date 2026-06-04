import React, { useState } from 'react';
import './App.css';

function App() {
  // Начальные данные студентов
  const [students, setStudents] = useState([
    { id: 1, name: 'Аньшин Сергей Алексаднрович', course: '3 курс', group: 'ИСП-306', selected: false },
    { id: 2, name: 'Круглов Тимур Викторович', course: '3 курс', group: 'ИСП-306', selected: false },
    { id: 3, name: 'Захаревич Александр -', course: '3 курс', group: 'ИСП-306', selected: false },
  ]);

  const [filter, setFilter] = useState('all'); // all, selected, notSelected
  const [newStudentName, setNewStudentName] = useState('');

  // Добавление студента
  const addStudent = () => {
    if (newStudentName.trim() === '') return;
    
    const newStudent = {
      id: Date.now(),
      name: newStudentName,
      course: '3 курс',
      group: 'ИСП-306',
      selected: false
    };
    
    setStudents([...students, newStudent]);
    setNewStudentName('');
  };

  // Удаление студента (через filter)
  const deleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  // Выделение студента (через map)
  const toggleSelect = (id) => {
    setStudents(students.map(student =>
      student.id === id
        ? { ...student, selected: !student.selected }
        : student
    ));
  };

  // Удалить выделенных
  const deleteSelected = () => {
    setStudents(students.filter(student => !student.selected));
  };

  // Выделить всех
  const selectAll = () => {
    setStudents(students.map(student => ({ ...student, selected: true })));
  };

  // Снять выделение
  const clearSelection = () => {
    setStudents(students.map(student => ({ ...student, selected: false })));
  };

  // Фильтрация студентов
  const getFilteredStudents = () => {
    if (filter === 'selected') {
      return students.filter(s => s.selected);
    }
    if (filter === 'notSelected') {
      return students.filter(s => !s.selected);
    }
    return students;
  };

  const filteredStudents = getFilteredStudents();
  const selectedCount = students.filter(s => s.selected).length;

  return (
    <div className="journal">
      {/* Шапка как на fa.ru */}
      <div className="header">
        <h1> Журнал группы ИСП-306</h1>
        <div className="stats">
          <span> Всего: {students.length}</span>
          <span> Выбрано: {selectedCount}</span>
        </div>
      </div>

      {/* Панель фильтрации */}
      <div className="filter-panel">
        <div className="filter-buttons">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >
            Все студенты
          </button>
          <button 
            className={filter === 'selected' ? 'active' : ''} 
            onClick={() => setFilter('selected')}
          >
            Выделенные
          </button>
          <button 
            className={filter === 'notSelected' ? 'active' : ''} 
            onClick={() => setFilter('notSelected')}
          >
            Невыделенные
          </button>
        </div>
      </div>

      {/* Список студентов */}
      <div className="student-list">
        {filteredStudents.length === 0 ? (
          <div className="empty-list">Нет студентов</div>
        ) : (
          filteredStudents.map(student => (
            <div 
              key={student.id} 
              className={`student-item ${student.selected ? 'selected' : ''}`}
            >
              <div 
                className="student-info"
                onClick={() => toggleSelect(student.id)}
              >
                <div className="student-name">{student.name}</div>
                <div className="student-details">
                  <span className="course">{student.course}</span>
                  <span className="group">{student.group}</span>
                </div>
              </div>
              <button 
                className="delete-btn"
                onClick={() => deleteStudent(student.id)}
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {/* Панель действий */}
      <div className="action-bar">
        <button className="action-btn select-all" onClick={selectAll}>
           Выделить всех
        </button>
        <button className="action-btn clear" onClick={clearSelection}>
           Снять выделение
        </button>
        <button className="action-btn delete-selected" onClick={deleteSelected}>
           Удалить выделенных ({selectedCount})
        </button>
      </div>

      {/* Форма добавления */}
      <div className="add-form">
        <input
          type="text"
          placeholder="ФИО студента"
          value={newStudentName}
          onChange={(e) => setNewStudentName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addStudent()}
        />
        <button onClick={addStudent}>➕ Добавить</button>
      </div>
    </div>
  );
}

export default App;