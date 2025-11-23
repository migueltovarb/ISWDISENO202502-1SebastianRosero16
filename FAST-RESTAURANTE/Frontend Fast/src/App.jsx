import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import Cart from './components/Cart';
import OrderStatus from './components/OrderStatus';
import AdminPanel from './components/AdminPanel';

function App() {
  const [currentView, setCurrentView] = useState('menu');
  const [cart, setCart] = useState([]);
  const [lastOrderId, setLastOrderId] = useState(null);

  const addToCart = (product, customization) => {
    setCart([...cart, { ...product, customization, id: Date.now() }]);
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleOrderCreated = (orderId) => {
    setLastOrderId(orderId);
    clearCart();
    setCurrentView('status');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        currentView={currentView}
        setCurrentView={setCurrentView}
        cartCount={cart.length}
      />

      <main className="container mx-auto px-4 py-8">
        {currentView === 'menu' && (
          <Menu 
            addToCart={addToCart}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'cart' && (
          <Cart 
            cart={cart}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            onOrderCreated={handleOrderCreated}
          />
        )}

        {currentView === 'status' && (
          <OrderStatus 
            orderId={lastOrderId}
          />
        )}

        {currentView === 'admin' && (
          <AdminPanel />
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <p className="text-sm">
            © 2025 FAST - Fast And Smart Takeout. Sistema de Pedidos en Línea.
          </p>
          <p className="text-xs mt-2">
            Proyecto Final - Diseño de Software
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
