import React, { useState } from 'react';

const products = [
  {
    id: 1,
    name: "Смартфон Xiaomi Redmi Note 11",
    price: 19999,
    image: "📱",
    description: "Мощный смартфон с отличной камерой",
    specs: { Экран: "6.43 дюйма", Процессор: "Snapdragon 680", Память: "4/64 ГБ" },
    extraSpecs: { ОС: "Android 11", Вес: "179г", Цвет: "Серый" }
  },
  {
    id: 2,
    name: "Ноутбук Lenovo IdeaPad",
    price: 54999,
    image: "💻",
    description: "Для учебы и работы",
    specs: { Экран: "15.6 дюймов", Процессор: "Intel Core i5", Память: "8/512 ГБ" },
    extraSpecs: { ОС: "Windows 11", Вес: "1.7кг", Цвет: "Черный" }
  },
  {
    id: 3,
    name: "Наушники Sony WH-1000XM4",
    price: 24999,
    image: "🎧",
    description: "С шумоподавлением",
    specs: { Тип: "Беспроводные", Батарея: "30ч", Шумоподавление: "Да" },
    extraSpecs: { Вес: "254г", Цвет: "Черный", Bluetooth: "5.0" }
  }
];

function UserInfo(props) {
  return (
    <div style={{ background: "#f0f0f0", padding: "10px", marginBottom: "20px", borderRadius: "8px" }}>
      <h3>Задание 1: Props</h3>
      <p>ФИО: {props.fullName}</p>
      <p>Возраст: {props.age}</p>
    </div>
  );
}

class ToggleButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { class: "off", label: "Нажми меня" };
    this.press = this.press.bind(this);
  }

  press() {
    let className = (this.state.class === "off") ? "on" : "off";
    let newLabel = (this.state.class === "off") ? "Нажато!" : "Нажми меня";
    this.setState({ class: className, label: newLabel });
  }

  render() {
    return (
      <button onClick={this.press} className={this.state.class}>
        {this.state.label}
      </button>
    );
  }
}

function ProductCard({ product, onAddToCart, onViewProduct }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px", textAlign: "center" }}>
      <div style={{ fontSize: "50px" }}>{product.image}</div>
      <h3>{product.name}</h3>
      <p>{product.price} ₽</p>
      <button onClick={() => onViewProduct(product)}>Подробнее</button>
      <button onClick={() => onAddToCart(product)} style={{ marginLeft: "10px" }}>В корзину</button>
    </div>
  );
}

function ProductDetails({ product, onAddToCart, onBack }) {
  const [showExtra, setShowExtra] = useState(false);

  return (
    <div>
      <button onClick={onBack}>← Назад</button>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "80px" }}>{product.image}</div>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <h3>{product.price} ₽</h3>
        
        <h4>Характеристики</h4>
        <ul>
          {Object.entries(product.specs).map(([key, value]) => (
            <li key={key}><b>{key}:</b> {value}</li>
          ))}
        </ul>
        
        <button onClick={() => setShowExtra(!showExtra)}>
          {showExtra ? "Свернуть" : "Развернуть"} параметры
        </button>
        
        {showExtra && (
          <div style={{ marginTop: "10px", padding: "10px", background: "#f9f9f9", borderRadius: "8px" }}>
            <h4>Все характеристики</h4>
            <ul>
              {Object.entries(product.extraSpecs).map(([key, value]) => (
                <li key={key}><b>{key}:</b> {value}</li>
              ))}
            </ul>
          </div>
        )}
        
        <br />
        <button onClick={() => onAddToCart(product)}>Добавить в корзину</button>
      </div>
    </div>
  );
}

function Cart({ cartItems, onUpdateQuantity, onBack }) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div>
        <button onClick={onBack}>← Назад</button>
        <h2>Корзина пуста</h2>
      </div>
    );
  }

  return (
    <div>
      <button onClick={onBack}>← Назад</button>
      <h2>Корзина</h2>
      {cartItems.map(item => (
        <div key={item.id} style={{ borderBottom: "1px solid #ddd", padding: "10px", display: "flex", alignItems: "center", gap: "15px" }}>
          <span style={{ fontSize: "30px" }}>{item.image}</span>
          <div style={{ flex: 1 }}>
            <h4>{item.name}</h4>
            <p>{item.price} ₽</p>
          </div>
          <div>
            <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
            <span style={{ margin: "0 10px" }}>{item.quantity}</span>
            <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
          </div>
          <div>{item.price * item.quantity} ₽</div>
        </div>
      ))}
      <h3>Итого: {total} ₽</h3>
    </div>
  );
}

function App() {
  const [page, setPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setPage('cart');
  };

  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item => item.id === id ? { ...item, quantity: newQty } : item));
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <UserInfo fullName="Иванов Иван Иванович" age="20" />
      
      <div style={{ marginBottom: "20px" }}>
        <ToggleButton />
      </div>
      
      <div style={{ marginTop: "30px" }}>
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <button onClick={() => setPage('home')}>Главная</button>
          <button onClick={() => setPage('cart')}>Корзина ({cart.reduce((s, i) => s + i.quantity, 0)})</button>
        </div>
        
        {page === 'home' && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "15px" }}>
            {products.map(product => (
              <ProductCard 
                key={product.id}
                product={product}
                onViewProduct={(p) => { setSelectedProduct(p); setPage('product'); }}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        )}
        
        {page === 'product' && selectedProduct && (
          <ProductDetails 
            product={selectedProduct}
            onAddToCart={addToCart}
            onBack={() => setPage('home')}
          />
        )}
        
        {page === 'cart' && (
          <Cart 
            cartItems={cart}
            onUpdateQuantity={updateQuantity}
            onBack={() => setPage('home')}
          />
        )}
      </div>
      
      <style>{`
        button {
          padding: 8px 16px;
          margin: 5px;
          border-radius: 4px;
          border: 1px solid #ccc;
          cursor: pointer;
        }
        button.on {
          background-color: #4CAF50;
          color: white;
        }
        button.off {
          background-color: #ccc;
          color: #666;
        }
      `}</style>
    </div>
  );
}

export default App;