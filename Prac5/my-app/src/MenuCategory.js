import React from 'react';

function MenuCategory({ categories, activeCategory, onCategoryChange }) {
  // Функция для получения иконки категории
  const getCategoryIcon = (category) => {
    const icons = {
      'все': '📋',
      'салаты': '🥗',
      'супы': '🍜',
      'горячее': '🔥',
      'десерты': '🍰'
    };
    return icons[category] || '🍽️';
  };

  // Функция для получения названия категории на русском
  const getCategoryName = (category) => {
    const names = {
      'все': 'Все блюда',
      'салаты': 'Салаты',
      'супы': 'Супы',
      'горячее': 'Горячие блюда',
      'десерты': 'Десерты'
    };
    return names[category] || category;
  };

  return (
    <div className="menu-category">
      <h3>📚 Категории меню</h3>
      <div className="categories-list">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`category-item ${activeCategory === category ? 'active' : ''}`}
            onClick={() => onCategoryChange(category)}
          >
            <span className="category-icon">{getCategoryIcon(category)}</span>
            <span className="category-name">{getCategoryName(category)}</span>
            {activeCategory === category && (
              <span className="active-indicator">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MenuCategory;