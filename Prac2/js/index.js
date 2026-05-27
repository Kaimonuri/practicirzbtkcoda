"use strict";

function Counter() {
  const [count, setCount] = React.useState(0);
  
  return (
    <div style={{textAlign: 'center', marginTop: '50px'}}>
      <h1>Счётчик</h1>
      <h2 style={{fontSize: '48px'}}>{count}</h2>
      <button onClick={() => setCount(count + 1)} style={{margin: '10px', padding: '10px'}}>+1</button>
      <button onClick={() => setCount(count - 1)} style={{margin: '10px', padding: '10px'}}>-1</button>
      <button onClick={() => setCount(0)} style={{margin: '10px', padding: '10px'}}>Сброс</button>
    </div>
  );
}

ReactDOM.render(<Counter />, document.getElementById('app'));


