import React from 'react';
import CartValue from './components/CartValue';
import ExpenseList from './components/ExpenseList';
import ItemSelected from './components/ItemSelected';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '@/App.css'

function App() {
  return (
    <div className="App">
      <CartValue />
      <ExpenseList />
      <ItemSelected />
    </div>
  );
}

export default App;