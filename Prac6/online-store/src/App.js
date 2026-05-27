import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import './App.css';

// Данные товаров в отдельном массиве
const productsData = [
  {
    id: 1,
    name: "Смартфон Galaxy X",
    price: 49990,
    oldPrice: 59990,
    image: "https://avatars.mds.yandex.net/i?id=cc931f123c2609925fb67690aba53ce7-3597607-images-thumbs&n=13",
    rating: 4.5,
    category: "electronics",
    description: "Мощный смартфон с отличной камерой и долгим временем работы",
    specifications: {
      display: "6.7\" AMOLED, 120Hz",
      processor: "Snapdragon 8 Gen 2",
      ram: "8GB",
      storage: "256GB",
      battery: "5000mAh",
      camera: "50MP + 12MP + 8MP"
    },
    fullSpecifications: {
      os: "Android 14",
      waterResistant: "IP68",
      charging: "65W быстрая зарядка",
      wireless: "15W беспроводная",
      weight: "195г",
      colors: ["Черный", "Белый", "Синий"]
    }
  },
  {
    id: 2,
    name: "Ноутбук ProBook",
    price: 89990,
    oldPrice: 99990,
    image: "https://images.satu.kz/236104762_w200_h200_hp-probook-465.jpg",
    rating: 4.8,
    category: "electronics",
    description: "Производительный ноутбук для работы и учебы",
    specifications: {
      display: "15.6\" IPS, 144Hz",
      processor: "Intel Core i7-13700H",
      ram: "16GB DDR5",
      storage: "512GB SSD",
      battery: "70Wh",
      camera: "HD веб-камера"
    },
    fullSpecifications: {
      os: "Windows 11 Pro",
      keyboard: "Подсветка клавиш",
      ports: "USB-C, HDMI, USB 3.2",
      wifi: "WiFi 6E",
      weight: "1.8кг",
      colors: ["Серый", "Серебристый"]
    }
  },
  {
    id: 3,
    name: "Беспроводные наушники",
    price: 12990,
    oldPrice: 19990,
    image: "https://avatars.mds.yandex.net/get-mpic/14273250/2a0000019740d8e277fd0fd426c89f96e47a/200x200",
    rating: 4.6,
    category: "audio",
    description: "Качественный звук с активным шумоподавлением",
    specifications: {
      type: "Накладные",
      battery: "40 часов",
      connection: "Bluetooth 5.3",
      microphone: "Встроенный",
      charging: "USB-C"
    },
    fullSpecifications: {
      noiseCancelling: "Да, гибридное",
      codecs: "AAC, SBC, aptX",
      weight: "250г",
      foldable: "Да",
      appSupport: "Да",
      colors: ["Черный", "Белый", "Бежевый"]
    }
  },
  {
    id: 4,
    name: "Смарт-часы Active",
    price: 15990,
    oldPrice: 24990,
    image: "https://avatars.mds.yandex.net/i?id=6d972929393400a6e4263de590e6b8a3_sr-5110375-images-thumbs&n=13",
    rating: 4.4,
    category: "wearables",
    description: "Фитнес-трекер с GPS и мониторингом здоровья",
    specifications: {
      display: "1.4\" AMOLED",
      battery: "7 дней",
      sensors: "Пульсометр, акселерометр",
      waterResistant: "5ATM"
    },
    fullSpecifications: {
      gps: "Встроенный",
      sleepTracking: "Да",
      stressMonitoring: "Да",
      workouts: "Более 100 режимов",
      notifications: "Да",
      colors: ["Черный", "Розовый", "Синий"]
    }
  },
  {
    id: 5,
    name: "Игровая мышь",
    price: 3990,
    oldPrice: 5990,
    image: "https://imgproxy.onliner.by/uXetIyzDuI5ISXC4URD0R4UplnWSq1TsSSH_NYWykN8/w:200/h:200/ex:1/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2UvMjAyNi9k/ODM0ZDhiMThjOThh/YzgwYjU4MjJmMGY1/NDRkZjZlZC5qcGc",
    rating: 4.7,
    category: "gaming",
    description: "Эргономичная мышь с RGB подсветкой",
    specifications: {
      sensor: "Optical, 16000 DPI",
      buttons: "6 программируемых",
      connection: "USB/Bluetooth",
      battery: "70 часов"
    },
    fullSpecifications: {
      rgb: "16.8 млн цветов",
      pollingRate: "1000Hz",
      weight: "89г",
      software: "Да, для настройки",
      colors: ["Черный", "Белый"]
    }
  },
  {
    id: 6,
    name: "Механическая клавиатура",
    price: 7990,
    oldPrice: 11990,
    image: "https://avatars.mds.yandex.net/i?id=f7d8eb17efbc009c022ead9e0df20e56_sr-13223322-images-thumbs&n=13",
    rating: 4.9,
    category: "gaming",
    description: "Компактная 60% клавиатура с тактильными свитчами",
    specifications: {
      switches: "Gateron Brown",
      backlight: "RGB",
      connection: "USB-C / Bluetooth",
      layout: "60%"
    },
    fullSpecifications: {
      hotswap: "Да",
      programming: "QMK/VIA",
      battery: "3000mAh",
      weight: "650г",
      colors: ["Черный", "Белый", "Розовый"]
    }
  }
];

// Компонент UserHeader - ФИО и возраст через props
const UserHeader = ({ fullName, age, group }) => {
  return (
    <div className="user-info">
      <div className="user-info-content">
        <span>👤 {fullName}</span>
        <span>• Возраст: {age} лет</span>
        <span>• Группа: {group}</span>
      </div>
    </div>
  );
};

// Компонент карточки товара
const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <div className="product-rating">
          {'★'.repeat(Math.floor(product.rating))}
          {'☆'.repeat(5 - Math.floor(product.rating))}
          <span className="rating-value">{product.rating}</span>
        </div>
        <div className="product-price">
          <span className="current-price">{product.price.toLocaleString()} ₽</span>
          {product.oldPrice && (
            <span className="old-price">{product.oldPrice.toLocaleString()} ₽</span>
          )}
        </div>
        <p className="product-description">{product.description}</p>
        <div className="product-actions">
          <Link to={`/product/${product.id}`} className="btn btn-secondary">
            Подробнее
          </Link>
          <button 
            className="btn btn-primary"
            onClick={() => onAddToCart(product)}
          >
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  );
};

// Главная страница с фильтрацией и поиском
const HomePage = ({ onAddToCart }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const categories = {
    all: 'Все товары',
    electronics: 'Электроника',
    audio: 'Аудио',
    wearables: 'Гаджеты',
    gaming: 'Gaming'
  };
  
  const filteredProducts = productsData.filter(product => {
    const matchesCategory = filter === 'all' || product.category === filter;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div className="page">
      <div className="filters-section">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="🔍 Поиск товаров..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="category-filters">
          {Object.entries(categories).map(([key, label]) => (
            <button
              key={key}
              className={`filter-btn ${filter === key ? 'active' : ''}`}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="no-results">
          <p>Товары не найдены</p>
        </div>
      )}
    </div>
  );
};

// Страница товара с кнопкой "Развернуть параметры"
class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFullSpecs: false,
      quantity: 1
    };
    this.toggleSpecs = this.toggleSpecs.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
    this.addToCartAndNavigate = this.addToCartAndNavigate.bind(this);
  }
  
  toggleSpecs() {
    this.setState({ showFullSpecs: !this.state.showFullSpecs });
  }
  
  changeQuantity(change) {
    this.setState(prevState => ({
      quantity: Math.max(1, prevState.quantity + change)
    }));
  }
  
  addToCartAndNavigate() {
    const { product, onAddToCart, navigate } = this.props;
    onAddToCart(product, this.state.quantity);
    if (navigate) navigate('/cart');
  }
  
  render() {
    const { product } = this.props;
    const { showFullSpecs, quantity } = this.state;
    
    if (!product) {
      return <div className="page">Товар не найден</div>;
    }
    
    return (
      <div className="page product-page">
        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-detail-info">
            <h1>{product.name}</h1>
            <div className="product-rating large">
              {'★'.repeat(Math.floor(product.rating))}
              {'☆'.repeat(5 - Math.floor(product.rating))}
              <span>{product.rating} / 5</span>
            </div>
            <div className="product-detail-price">
              <span className="current-price">{product.price.toLocaleString()} ₽</span>
              {product.oldPrice && (
                <span className="old-price">{product.oldPrice.toLocaleString()} ₽</span>
              )}
            </div>
            <p className="product-detail-description">{product.description}</p>
            
            <div className="specifications-section">
              <h3>Характеристики</h3>
              <div className="specs-grid">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="spec-item">
                    <span className="spec-key">{key}:</span>
                    <span className="spec-value">{value}</span>
                  </div>
                ))}
              </div>
              
              <button className="btn-expand" onClick={this.toggleSpecs}>
                {showFullSpecs ? '▼ Свернуть параметры' : '▶ Развернуть параметры'}
              </button>
              
              {showFullSpecs && (
                <div className="full-specs animate-slide-down">
                  <h4>Все характеристики</h4>
                  <div className="specs-grid">
                    {Object.entries(product.fullSpecifications).map(([key, value]) => (
                      <div key={key} className="spec-item">
                        <span className="spec-key">{key}:</span>
                        <span className="spec-value">
                          {Array.isArray(value) ? value.join(', ') : value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="quantity-selector">
              <button onClick={() => this.changeQuantity(-1)}>-</button>
              <span>{quantity}</span>
              <button onClick={() => this.changeQuantity(1)}>+</button>
            </div>
            
            <div className="product-actions-large">
              <button className="btn btn-primary btn-large" onClick={this.addToCartAndNavigate}>
                🛒 Добавить в корзину и перейти
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Обертка для получения параметров из URL
const ProductPageWrapper = ({ addToCart }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = productsData.find(p => p.id === parseInt(id));
  
  return (
    <ProductPage 
      product={product} 
      onAddToCart={addToCart} 
      navigate={navigate}
    />
  );
};

// Страница корзины
const CartPage = ({ cart, updateQuantity, removeFromCart, getTotalPrice }) => {
  return (
    <div className="page cart-page">
      <h1>🛒 Корзина</h1>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Корзина пуста</p>
          <Link to="/" className="btn btn-primary">Перейти к покупкам</Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.product.id} className="cart-item">
                <img src={item.product.image} alt={item.product.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <h3>{item.product.name}</h3>
                  <p className="cart-item-price">{item.product.price.toLocaleString()} ₽</p>
                </div>
                <div className="cart-item-quantity">
                  <button onClick={() => updateQuantity(item.product.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, 1)}>+</button>
                </div>
                <div className="cart-item-total">
                  {(item.product.price * item.quantity).toLocaleString()} ₽
                </div>
                <button className="cart-item-remove" onClick={() => removeFromCart(item.product.id)}>
                  ✕
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div className="cart-total">
              <span>Итого:</span>
              <span className="total-price">{getTotalPrice().toLocaleString()} ₽</span>
            </div>
            <button className="btn btn-primary btn-checkout">Оформить заказ</button>
          </div>
        </>
      )}
    </div>
  );
};

// Главный компонент App
class App extends React.Component {
  constructor(props) {
    super(props);
    const savedCart = localStorage.getItem('cart');
    this.state = {
      cart: savedCart ? JSON.parse(savedCart) : [],
      userInfo: {
        fullName: "Сергей Александрович Аньшин",
        age: 18,
        group: "ИСП-306"
      }
    };
    this.addToCart = this.addToCart.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.getTotalPrice = this.getTotalPrice.bind(this);
  }
  
  componentDidUpdate() {
    localStorage.setItem('cart', JSON.stringify(this.state.cart));
  }
  
  addToCart(product, quantity = 1) {
    this.setState(prevState => {
      const existingItem = prevState.cart.find(item => item.product.id === product.id);
      if (existingItem) {
        return {
          cart: prevState.cart.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        };
      }
      return {
        cart: [...prevState.cart, { product, quantity }]
      };
    });
  }
  
  updateQuantity(productId, delta) {
    this.setState(prevState => ({
      cart: prevState.cart
        .map(item => {
          if (item.product.id === productId) {
            const newQuantity = item.quantity + delta;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter(Boolean)
    }));
  }
  
  removeFromCart(productId) {
    this.setState(prevState => ({
      cart: prevState.cart.filter(item => item.product.id !== productId)
    }));
  }
  
  getTotalPrice() {
    return this.state.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }
  
  render() {
    const { userInfo, cart } = this.state;
    const { addToCart, updateQuantity, removeFromCart, getTotalPrice } = this;
    
    return (
      <Router>
        <div className="app">
          <UserHeader fullName={userInfo.fullName} age={userInfo.age} group={userInfo.group} />
          
          <nav className="navbar">
            <Link to="/" className="nav-logo"> TechStore</Link>
            <div className="nav-links">
              <Link to="/">Главная</Link>
              <Link to="/cart" className="cart-link">
                🛒 Корзина
                {cart.length > 0 && <span className="cart-badge">{cart.reduce((sum, i) => sum + i.quantity, 0)}</span>}
              </Link>
            </div>
          </nav>
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage onAddToCart={addToCart} />} />
              <Route path="/product/:id" element={<ProductPageWrapper addToCart={addToCart} />} />
              <Route path="/cart" element={
                <CartPage 
                  cart={cart}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                  getTotalPrice={getTotalPrice}
                />
              } />
            </Routes>
          </main>
          
          <footer className="footer">
            <p>© 2024 TechStore. Все права защищены.</p>
            <p>Разработано с любовью к React</p>
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;