import React, { useState } from 'react';
import './App.css';
import MenuItem from './MenuItem';
import MenuCategory from './MenuCategory';

// Импорт изображений (создайте папку public/images и добавьте туда фото)
// В реальном проекте лучше использовать импорт, но для простоты используем URL

function App() {
  const [activeCategory, setActiveCategory] = useState('все');
  const [expandedItems, setExpandedItems] = useState({});

  // Массив блюд с фото
  const menuItems = [
    {
      id: 1,
      name: 'Цезарь с курицей',
      category: 'салаты',
      price: 450,
      ingredients: 'куриное филе, салат романо, пармезан, соус цезарь, гренки',
      weight: 280,
      calories: 540,
      description: 'Классический салат с хрустящими гренками и нежной курицей',
      image: 'https://cdn.food.ru/unsigned/fit/640/480/ce/0/czM6Ly9tZWRpYS9waWN0dXJlcy8yMDI0MDQyMy8zazZtNFAuanBlZw.jpg',
      isPopular: true
    },
    {
      id: 2,
      name: 'Греческий салат',
      category: 'салаты',
      price: 380,
      ingredients: 'огурцы, помидоры, перец, фета, оливки, оливковое масло',
      weight: 250,
      calories: 320,
      description: 'Свежий салат с греческим сыром и оливками',
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop',
      isPopular: false
    },
    {
      id: 3,
      name: 'Томатный суп',
      category: 'супы',
      price: 320,
      ingredients: 'помидоры, базилик, сливки, чеснок, лук',
      weight: 300,
      calories: 280,
      description: 'Ароматный суп с базиликом и сливками',
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
      isPopular: true
    },
    {
      id: 4,
      name: 'Грибной крем-суп',
      category: 'супы',
      price: 350,
      ingredients: 'шампиньоны, картофель, сливки, трюфельное масло',
      weight: 300,
      calories: 310,
      description: 'Нежный крем-суп с лесными грибами',
      image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=400&h=300&fit=crop',
      isPopular: false
    },
    {
      id: 5,
      name: 'Стейк Рибай',
      category: 'горячее',
      price: 890,
      ingredients: 'говядина, розмарин, чеснок, сливочное масло',
      weight: 300,
      calories: 680,
      description: 'Мраморный стейк идеальной прожарки',
      image: 'https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67f7c4bd1aaeee0ae2d13001_67f7c60da0368676d988c474/scale_1200',
      isPopular: true
    },
    {
      id: 6,
      name: 'Паста Карбонара',
      category: 'горячее',
      price: 490,
      ingredients: 'спагетти, бекон, яйцо, пармезан, черный перец',
      weight: 280,
      calories: 620,
      description: 'Итальянская паста с кремовым соусом',
      image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop',
      isPopular: false
    },
    {
      id: 7,
      name: 'Чизкейк Нью-Йорк',
      category: 'десерты',
      price: 320,
      ingredients: 'сливочный сыр, печенье, сливки, ягоды',
      weight: 180,
      calories: 450,
      description: 'Нежный чизкейк с ягодным соусом',
      image: 'https://i.ytimg.com/vi/_Pp4iKzouEs/maxresdefault.jpg',
      isPopular: true
    },
    {
      id: 8,
      name: 'Тирамису',
      category: 'десерты',
      price: 380,
      ingredients: 'маскарпоне, савоярди, кофе, какао',
      weight: 150,
      calories: 420,
      description: 'Классический итальянский десерт',
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop',
      isPopular: false
    }
  ];

  // Получение уникальных категорий
  const categories = ['все', ...new Set(menuItems.map(item => item.category))];

  // Фильтрация блюд по категории
  const filteredItems = activeCategory === 'все' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  // Обработчик раскрытия деталей блюда
  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="app">
      <header className="header">
        <h1> Ресторан "Вкусно и Точка"</h1>
        <p>Изысканная кухня для настоящих гурманов</p>
      </header>

      <div className="main-container">
        <MenuCategory 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <div className="menu-content">
          <div className="menu-header">
            <h2>
              {activeCategory === 'все' ? '📋 Все блюда' : 
               activeCategory === 'салаты' ? '🥗 Салаты' :
               activeCategory === 'супы' ? '🍜 Супы' :
               activeCategory === 'горячее' ? '🔥 Горячие блюда' :
               activeCategory === 'десерты' ? '🍰 Десерты' : activeCategory}
            </h2>
            <p>Найдено: {filteredItems.length} блюд</p>
          </div>

          {filteredItems.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">😕</span>
              <p>В этой категории пока нет блюд</p>
              <button 
                className="reset-btn"
                onClick={() => setActiveCategory('все')}
              >
                Показать все блюда
              </button>
            </div>
          ) : (
            <div className="menu-grid">
              {filteredItems.map(item => (
                <MenuItem 
                  key={item.id}
                  item={item}
                  isExpanded={expandedItems[item.id]}
                  onToggle={() => toggleExpand(item.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;