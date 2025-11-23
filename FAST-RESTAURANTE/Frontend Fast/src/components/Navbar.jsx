import React from 'react';

const Navbar = ({ currentView, setCurrentView, cartCount }) => {
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo y nombre */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentView('menu')}>
            <div className="flex items-center">
              {/* Logo FAST - Usando SVG inline con el diseño del logo */}
              <svg width="60" height="60" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                {/* Círculo de fondo azul */}
                <circle cx="100" cy="100" r="95" fill="#2563eb"/>
                
                {/* Texto FAST en blanco */}
                <text x="100" y="85" fontFamily="Arial, sans-serif" fontSize="48" fontWeight="bold" fill="white" textAnchor="middle">
                  FAST
                </text>
                
                {/* Motocicleta simplificada debajo */}
                <g transform="translate(100, 120)">
                  {/* Líneas de velocidad */}
                  <line x1="-35" y1="-5" x2="-25" y2="-5" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  <line x1="-30" y1="0" x2="-20" y2="0" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  <line x1="-35" y1="5" x2="-25" y2="5" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  
                  {/* Cuerpo de la moto */}
                  <rect x="-15" y="-8" width="30" height="12" rx="4" fill="white"/>
                  
                  {/* Ruedas */}
                  <circle cx="-10" cy="10" r="8" fill="white"/>
                  <circle cx="10" cy="10" r="8" fill="white"/>
                  <circle cx="-10" cy="10" r="4" fill="#2563eb"/>
                  <circle cx="10" cy="10" r="4" fill="#2563eb"/>
                </g>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-fast-blue">FAST</h1>
              <p className="text-xs text-gray-500">Fast And Smart Takeout</p>
            </div>
          </div>

          {/* Navegación */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => setCurrentView('menu')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                currentView === 'menu'
                  ? 'bg-fast-blue text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              📋 Menú
            </button>

            <button
              onClick={() => setCurrentView('cart')}
              className={`relative px-4 py-2 rounded-lg font-medium transition ${
                currentView === 'cart'
                  ? 'bg-fast-blue text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              🛒 Carrito
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setCurrentView('status')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                currentView === 'status'
                  ? 'bg-fast-blue text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              📦 Mis Pedidos
            </button>

            <button
              onClick={() => setCurrentView('admin')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                currentView === 'admin'
                  ? 'bg-orange-600 text-white'
                  : 'text-orange-600 hover:bg-orange-50 border border-orange-600'
              }`}
            >
              ⚙️ Admin
            </button>
          </div>

          {/* Navegación móvil */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setCurrentView('menu')}
              className={`p-2 rounded ${currentView === 'menu' ? 'bg-fast-blue text-white' : 'text-gray-700'}`}
            >
              📋
            </button>
            <button
              onClick={() => setCurrentView('cart')}
              className={`relative p-2 rounded ${currentView === 'cart' ? 'bg-fast-blue text-white' : 'text-gray-700'}`}
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setCurrentView('status')}
              className={`p-2 rounded ${currentView === 'status' ? 'bg-fast-blue text-white' : 'text-gray-700'}`}
            >
              📦
            </button>
            <button
              onClick={() => setCurrentView('admin')}
              className={`p-2 rounded ${currentView === 'admin' ? 'bg-orange-600 text-white' : 'text-orange-600'}`}
            >
              ⚙️
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
