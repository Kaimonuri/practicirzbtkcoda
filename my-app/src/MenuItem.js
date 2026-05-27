import React, { useState } from 'react';

function MenuItem({ item, isExpanded, onToggle }) {
  const [imageError, setImageError] = useState(false);

  // Запасное изображение на случай ошибки загрузки
  const fallbackImage = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop';

  return (
    <div className="menu-item">
      <div className="menu-item-container">
        {/* Блок с изображением */}
        <div className="menu-item-image">
          {!imageError ? (
            <img 
              src={item.image} 
              alt={item.name}
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className="image-placeholder">
              <span>🍽️</span>
            </div>
          )}
          {/* Бейдж популярного блюда */}
          {item.isPopular && (
            <div className="popular-badge">
              <span>⭐ Популярное</span>
            </div>
          )}
        </div>

        {/* Блок с информацией */}
        <div className="menu-item-content">
          <div className="menu-item-header">
            <div className="item-info">
              <h3 className="item-name">{item.name}</h3>
              <p className="item-description">{item.description}</p>
            </div>
            <div className="item-price">{item.price} ₽</div>
          </div>
          
          <div className="item-actions">
            <button 
              className="details-btn"
              onClick={onToggle}
            >
              {isExpanded ? '▲ Скрыть детали' : '▼ Показать детали'}
            </button>
          </div>

          {/* Условный рендеринг деталей блюда */}
          {isExpanded && (
            <div className="item-details">
              <div className="detail-row">
                <span className="detail-label">📝 Ингредиенты:</span>
                <span className="detail-value">{item.ingredients}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">⚖️ Вес:</span>
                <span className="detail-value">{item.weight} г</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">🔥 Калорийность:</span>
                <span className="detail-value">{item.calories} ккал</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">💰 Цена за грамм:</span>
                <span className="detail-value">{(item.price / item.weight).toFixed(2)} ₽/г</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuItem;